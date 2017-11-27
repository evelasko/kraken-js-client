import {Config} from '../Config';
import {Helper} from './Helper';

const DEFAULT_RETRY_COUNT = 3;
const MODULE_NAME = '[Retry:Module]';


export class Retry {

    resource: Function;
    _resolveFn: Function;
    _rejectFn: Function;

    _retryCount: number = Config.RETRY_COUNT;
    _retryDelay: number = Config.DEFAULT_TIMEOUT;
    _attemptsCount: number = 0;

    /**
     * Resource passed must be bound to a ctx of execution or pass in ctx ( class instance ) unfortunately
     * new Retry(this.client.post, this.client)
     * new Retry(this.client.post.bind(this.client))
     *
     * @param resource
     * @param ctx
     */
    constructor(resource, ctx) {

        if (typeof resource === 'function') {
            this.resource = ctx ? resource.bind(ctx) : resource;

        } else {
            throw Error('Retry:Params [Retry excepts resource as first param to be a Function(): Promise<any> {}]')
        }

        this._retryCount = DEFAULT_RETRY_COUNT;

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
                    return this._rejectFn(Helper.parseKrakenErrors(err));
                }

                if (this._attemptsCount <= this._retryCount) {
                    console.log(MODULE_NAME, 'Retrying request: "{}" with args: {}', this.resource.name || '', reqArgs);

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

