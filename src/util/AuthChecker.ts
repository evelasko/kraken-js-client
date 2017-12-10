import {Logger} from './logger/logger';

const MODULE_NAME = 'Params:Auth';

const AuthKeyConfig = {
    apiKey: 'apiKey',
    apiSecret: 'apiSecret'
};

const OptsFormat = '{apiKey: string, apiSecret: string}';

export class AuthChecker {

    private log: Logger;

    constructor(opts) {

        this.log = new Logger(MODULE_NAME);

        if (typeof opts !== 'object') {
            this.log.error('Auth options in format: ', OptsFormat);
            throw Error('[' + MODULE_NAME + ']Auth needs to be passed as object in format: ' + OptsFormat);
        }

        this.validateAuth(opts);
    }

    validateAuth(opts) {
        let key = opts[AuthKeyConfig.apiKey];
        let secret = opts[AuthKeyConfig.apiSecret];

        if (this.checkInvalidKey(key)) {
            this.log.error('Api Key not provided. Options format: ' + OptsFormat);
            throw new Error('Invalid auth options. Api Key not provided.');
        }

        if (this.checkInvalidKey(secret)) {
            this.log.error(MODULE_NAME, 'Api Secret not provided.  Options format: ' + OptsFormat);
            throw new Error('Invalid auth options. Api Secret not provided.');
        }
    }

    checkInvalidKey(key) {
        return typeof key === 'undefined' || typeof key !== 'string';
    }

}

