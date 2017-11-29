import {map} from 'lodash';
import {Config} from '../Config';
import {IAuthOpts} from '../common/interfaces';

const Conf = Config.config;

export class Util {

    static getApiPath(path): string {

        if (typeof path === 'string' && path.charAt(0) !== '/') {
            path = '/' + path;
        }

        return Conf.KRAKEN_API_ENDPOINT + path;
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

    static validateAsset(asset): void {
        if (typeof asset !== 'string' || !asset) {
            throw new Error('Kraken:Assets: `asset` variable need to be a non-empty string')
        }
    }

    static parseKrakenErrors(err: Array<string>): string | boolean {

        if (!Array.isArray(err)) {
            console.warn('err passed is not instance of Array');
            return false;
        }

        let msg = '';

        let errors: Array<string> = err
            .filter((e: string) => e.startsWith('E'))
            .map((e: string) => e.substr(1));

        let warnings: Array<string> = err
            .filter((e) => e.startsWith('W'))
            .map((e) => e.substr(1));

        if (errors.length > 0) {
            msg = msg + '[Errors] ' + err.join('; ') + ';';
        }

        if (warnings.length > 0) {
            msg = msg + '[Warnings] ' + err.join('; ') + ';';
        }

        return msg;
    }

    static chunkArray(array: Array<any>, chunkSize): Array<Array<any>> {

        chunkSize = chunkSize || 20;

        let result: Array<any> = map(array, function (item, index) {
            return index % chunkSize === 0 ? array.slice(index, index + chunkSize) : null;
        }).filter(function (item) {
            return item;
        });

        return result;
    }

    /**
     * Validate auth object
     *
     * @param {IAuthOpts} auth
     * @returns {boolean}
     */
    static validateAuth(auth: IAuthOpts) {

        let apiKey = auth.apiKey;
        let apiSecret = auth.apiSecret;

        if (!apiKey || !apiSecret) {
            return false;
        }

        if (apiKey.length === 0 || apiSecret.length === 0) {
            return false;
        }

        return true;
    }

}
