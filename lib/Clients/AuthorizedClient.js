const KRAKEN_API_ENDPOINT_URL = require('../Config').KRAKEN_API_ENDPOINT;
const request = require('request-promise');
const qs = require('querystring');

const Retry = require('../Common/Retry');

const MS = require('./MessageSignature');
const MessageSignature = new MS();

class AuthorizedClient {

    constructor({apiKey, apiSecret, opts}) {
        this.apiKey = apiKey;
        MessageSignature.setSecret(apiSecret);

        if (opts && opts.retryCount) {
            this.retryCount = opts.retryCount;
        }
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

        let data = Object.assign(message, {nonce: nonce});

        const _messageSignature = MessageSignature.getSignature(path, data, nonce);
        const url = KRAKEN_API_ENDPOINT_URL + path;

        const options = {
            headers: {
                'User-Agent': 'Kraken Javascript API Client',
                'API-Key': this.apiKey,
                'API-Sign': _messageSignature
            },
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

                    let body = response.body;

                    if (body.error && body.error.length > 0) {
                        return reject(body, response);
                    }

                    resolve(body, response);
                })
                .catch(e => reject(e))
        });

    }

    getNonce() {
        return new Date() * 1000;
    }
}

module.exports = AuthorizedClient;
