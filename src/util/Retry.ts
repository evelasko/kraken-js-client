import {DefaultConfig} from '../config';
import {Util} from './Util';
import {Logger} from './logger/logger';

const MODULE_NAME = 'RetryModule';


export class Retry {

    private logger: Logger;

    private resource: (...args) => Promise<any>;
    private _resolveFn: (...args) => void;
    private _rejectFn: (...args) => void;

    private _retryCount: number = DefaultConfig.RETRY_COUNT;
    private _retryDelay: number = DefaultConfig.DEFAULT_TIMEOUT;
    private _attemptsCount: number = 0;

    /**
     * Resource passed must be bound to a ctx of execution or pass in ctx ( class instance ) unfortunately
     * new Retry(this.client.post, this.client)
     * new Retry(this.client.post.bind(this.client))
     *
     * @param resource
     * @param ctx
     */
    constructor(resource, ctx?) {

        this.logger = new Logger(MODULE_NAME);

        if (typeof resource === 'function') {
            this.resource = ctx ? resource.bind(ctx) : resource;
        } else {
            this.logger.debug('Invalid params passed, resource not passed to module.');
            throw Error('Retry:Params [Retry excepts resource as first param to be a Function(): Promise<any> {}]');
        }

    }

    setRetryCount(num) {
        if (typeof num === 'number') {
            this._retryCount = num;
        }
    }

    setRetryDelay(num) {
        if (typeof num === 'number') {
            this._retryDelay = num;
        }
    }

    request(...args) {
        let fnArgs = args;

        return new Promise((resolve, reject) => {
            this._resolveFn = resolve;
            this._rejectFn = reject;

            this._request(...fnArgs);
        });
    }

    _request(...args) {
        let reqArgs = args;

        this.resource(...reqArgs)
            .then((...args) => {
                this._resolveFn(...args)
            })
            .catch((err) => {
                this._attemptsCount++;

                /**
                 * Do not retry if its a known kraken error
                 */
                if (Array.isArray(err)) {
                    this.logger.debug('Known error received from kraken. Abort retry.');
                    return this._rejectFn(Util.parseKrakenErrors(err));
                }

                if (this._attemptsCount <= this._retryCount) {
                    this.logger.debug(`Retrying request with args: `, JSON.stringify(reqArgs));

                    // Retry delay
                    setTimeout(() =>{
                        this._request.apply(this, reqArgs)
                    }, this._retryDelay);

                } else {
                    this._rejectFn(err);
                }

            });
    }

}

