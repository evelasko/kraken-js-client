const Config = require('../Config');

export class Helper {

    static getApiPath(path) {

        if (typeof path === 'string' && path.charAt(0) !== '/') {
            path = '/' + path;
        }

        return Config.KRAKEN_API_ENDPOINT + path;
    }

}