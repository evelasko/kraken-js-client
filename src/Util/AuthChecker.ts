const MODULE_NAME = '[Params:Auth]';

const AuthKeyConfig = {
    apiKey: 'apiKey',
    apiSecret: 'apiSecret'
};

const OptsFormat = '{apiKey: string, apiSecret: string}';

export class AuthChecker {

    constructor(opts) {

        if (typeof opts !== 'object') {
            console.error(MODULE_NAME, 'Auth options in format:', OptsFormat);
            throw Error(MODULE_NAME + 'Auth needs to be passed as object in format: ' + OptsFormat);
        }

        this.validateAuth(opts)
    }

    validateAuth(opts) {
        let key = opts[AuthKeyConfig.apiKey];
        let secret = opts[AuthKeyConfig.apiSecret];

        if (this.checkInvalidKey(key)) {
            console.error(MODULE_NAME, 'Api Key not provided. Options format: ' + OptsFormat);
            throw new Error('Invalid auth options. Api Key not provided.');
        }

        if (this.checkInvalidKey(secret)) {
            console.error(MODULE_NAME, 'Api Secret not provided.  Options format: ' + OptsFormat);
            throw new Error('Invalid auth options. Api Secret not provided.');
        }
    }

    checkInvalidKey(key) {
        return typeof key === 'undefined' || typeof key !== 'string';
    }

}

