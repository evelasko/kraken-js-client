const DEFAULT_RETRY_COUNT = 0;
const MODULE_NAME = '[Retry:Module]';

class Retry {

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
        this._attemptsCount = 0;

    }

    setRetryCount(num) {
        if (typeof num === 'number') {
            this._retryCount = num;
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
            .then((...args) => { this._resolveFn(...args)})
            .catch((...args) => {
                this._attemptsCount++;

                if (this._attemptsCount <= this._retryCount) {
                    console.warn(MODULE_NAME, 'Retrying request: "{}" with args: {}', this.resource.name || '', reqArgs);
                    this._request.apply(this, reqArgs)
                } else {
                    this._rejectFn(...args);
                }

            });
    }

}

module.exports = Retry;