import {Config} from '../Config';

export class Helper {

    static getApiPath(path) {

        if (typeof path === 'string' && path.charAt(0) !== '/') {
            path = '/' + path;
        }

        return Config.KRAKEN_API_ENDPOINT + path;
    }

    static validateAssets(assets) {

        if (assets !== null) {

            if (!(assets instanceof Array) || assets.length === 0) {
                throw new Error('Kraken:Assets: `assets` for non-null values need to be an array');
            }

            assets.forEach((asset) => {
                if (typeof asset !== 'string' || !asset) {
                    throw new Error('Kraken:Assets: every `asset` in array need to be a non-empty string')
                }
            });

        }

    }

    static validateAsset(asset) {
        if (typeof asset !== 'string' || !asset) {
            throw new Error('Kraken:Assets: `asset` variable need to be a non-empty string')
        }
    }

}
