import {map} from 'lodash';
import {Config} from '../config';
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

            if (!(assets instanceof Array)) {
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

        let errors: Array<string> = Util.extractKrakenErrors(err);
        let warnings: Array<string> = Util.extractKrakenWarnings(err);

        if (errors.length > 0) {
            msg = msg + '[Errors] ' + err.join('; ') + ';';
        }

        if (warnings.length > 0) {
            msg = msg + '[Warnings] ' + err.join('; ') + ';';
        }

        return msg;
    }

    static extractKrakenErrors(err: string[]): string[] {

        let errors: Array<string> = err
            .filter((e: string) => e.startsWith('E'))
            .map((e: string) => e.substr(1));

        return errors;
    }

    static extractKrakenWarnings(err: string[]): string[] {

        let warnings: Array<string> = err
            .filter((e: string) => e.startsWith('W'))
            .map((e: string) => e.substr(1));

        return warnings;
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

        if (typeof auth === 'undefined') { return false; }

        let apiKey = auth.apiKey;
        let apiSecret = auth.apiSecret;

        if (typeof apiKey !== 'string' || typeof apiSecret !== 'string') {
            return false;
        }

        if (apiKey.length === 0 || apiSecret.length === 0) {
            return false;
        }

        return true;
    }

}
