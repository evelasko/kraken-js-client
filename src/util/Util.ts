import {map} from 'lodash';
import {Config} from '../config';
import {IAuthOpts} from '../common/interfaces';
import {Logger} from './logger/logger';

const Conf = Config.config;

export class Util {

    static logger: Logger = new Logger('Kraken:Util');

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
                    throw new Error('Kraken:Assets: every `asset` in array need to be a non-empty string');
                }
            });

        }

    }

    static validateAsset(asset): void {
        if (typeof asset !== 'string' || !asset) {
            throw new Error('Kraken:Assets: `asset` variable need to be a non-empty string');
        }
    }

    static parseKrakenErrors(err: string[]): string | boolean {

        if (!Array.isArray(err)) {
            Util.logger.warn('[Kraken:error:parser] Err passed is not instance of Array');
            return false;
        }

        let msg = '';

        const errors: string[] = Util.extractKrakenErrors(err);
        const warnings: string[] = Util.extractKrakenWarnings(err);

        if (errors.length > 0) {
            msg = msg + '[Errors] ' + err.join('; ') + ';';
        }

        if (warnings.length > 0) {
            msg = msg + '[Warnings] ' + err.join('; ') + ';';
        }

        return msg;
    }

    static extractKrakenErrors(err: string[]): string[] {

        const errors: string[] = err
            .filter((e: string) => e.startsWith('E'))
            .map((e: string) => e.substr(1));

        return errors;
    }

    static extractKrakenWarnings(err: string[]): string[] {

        const warnings: string[] = err
            .filter((e: string) => e.startsWith('W'))
            .map((e: string) => e.substr(1));

        return warnings;
    }

    static chunkArray(array: any[], chunkSize): any[][] {

        chunkSize = chunkSize || 20;

        const result: any[] = map(array, (item, index) => {
            return index % chunkSize === 0 ? array.slice(index, index + chunkSize) : null;
        }).filter((item) => {
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

        const apiKey = auth.apiKey;
        const apiSecret = auth.apiSecret;

        if (typeof apiKey !== 'string' || typeof apiSecret !== 'string') {
            return false;
        }

        if (apiKey.length === 0 || apiSecret.length === 0) {
            return false;
        }

        return true;
    }

}
