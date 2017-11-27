const MODULE_NAME = '[Params:Auth]';

const AuthKeyConfig = {
    apiKey: 'apiKey',
    apiSecret: 'apiSecret'
};

const OptsFormat = '{apiKey: string, apiSecret: string, otp?: string} // otp is required only if u gave 2FA enabled';

export class AuthChecker {

    constructor(opts) {

        if (typeof opts !== 'object') {
            console.error(MODULE_NAME, 'Clients with auth require options in format:', OptsFormat);
            throw Error('Clients with auth require options passed as object');
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

