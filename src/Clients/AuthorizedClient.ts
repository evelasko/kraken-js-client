import * as request from 'request-promise'
import * as qs from 'querystring';
import {extend} from 'lodash';

import {Config} from '../Config';
import {Retry} from '../Common/Retry';
import {MessageSignature} from './MessageSignature'
import {Helper} from '../Common/Helper';

const KRAKEN_API_ENDPOINT_URL = Config.KRAKEN_API_ENDPOINT;

export interface IOtp {
    otp?: string;
}

export interface IClientOpts {
    retryCount?: number;
    retryDelay?: number;
}

export interface IAuthOpts {
    apiKey: string;
    apiSecret: string;
}

export class AuthorizedClient {

    private auth: IAuthOpts;

    private retryCount: number;
    private retryDelay: number;

    protected MessageSignature: MessageSignature;

    /**
     * AuthOpts are required but u can default to empty strings so client wont send auth headers
     *
     * @param {IAuthOpts} authOpts
     * @param {IClientOpts} opts
     */
    constructor(authOpts: IAuthOpts, opts?: IClientOpts) {
        opts = opts || {};
        this.auth = authOpts;

        if (opts.retryCount) {
            this.retryCount = opts.retryCount;
        }

        if (opts.retryDelay) {
            this.retryDelay = opts.retryDelay;
        }

        this.configureAuth();
    }

    private configureAuth() {
        this.MessageSignature = new MessageSignature();
        this.MessageSignature.setSecret(this.auth.apiSecret);
    }

    post(path, data) {
        return this.requestRetry('POST', path, data);
    }

    get(path, data) {
        return this.requestRetry('GET', path, data);
    }

    put(path, data) {
        return this.requestRetry('PUT', path, data);
    }

    delete(path, data) {
        return this.requestRetry('DELETE', path, data);
    }

    requestRetry(...args) {
        let resource = new Retry(this._request, this);


        if (this.retryDelay) {
            resource.setRetryDelay(this.retryDelay);
        }

        if (this.retryCount) {
            resource.setRetryCount(this.retryCount);
        }

        return resource.request(...args);
    }

    _request(method, path, message) {

        /**
         * Need message to be empty object as default so extending will work
         * @type {*|{}}
         */
        message = message || {};

        const nonce = this.getNonce();

        /**
         * OTP will be set during the call in payload which will extend this object
         * @type {{nonce: number}}
         */
        let authData = {
            nonce: nonce
        };

        let data = Object.assign(message, authData);

        const _messageSignature = this.MessageSignature.getSignature(path, data, nonce);
        const url = KRAKEN_API_ENDPOINT_URL + path;

        let headers = {
            'User-Agent': 'Kraken Javascript API Client'
        };

        if (Helper.validateAuth(this.auth)) {
            headers = extend(headers, {
                'API-Key': this.auth.apiKey,
                'API-Sign': _messageSignature
            });
        }

        const options: any = {
            headers: headers,
            method: method.toUpperCase(),
            resolveWithFullResponse: true,
            uri: url
        };

        if (method.toLowerCase() === 'get') {
            options.qs = data;
        } else {
            options.body = qs.stringify(data);
        }

        return new Promise((resolve, reject) => {

            request(options)
                .then((response) => {

                    let body;

                    try {
                        body = JSON.parse(response.body);
                    } catch (e) {
                        throw new Error('Cannot parse Kraken data response.');
                    }

                    if (body.error && body.error.length > 0) {
                        return reject(body.error);
                    }

                    return resolve(body.result);
                })
                .catch(e => reject(e))
        });

    }

    getNonce() {
        let time = new Date() as any;
        return time * 1000;
    }

}
