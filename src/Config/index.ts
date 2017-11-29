import {extend} from 'lodash';

/**
 * Internal Client Configuration
 */

export const DefaultConfig: IConfig = {
    KRAKEN_API_ENDPOINT: 'https://api.kraken.com',
    API_VERISON: 0,
    DEFAULT_TIMEOUT: 200, // 0.2s
    RETRY_COUNT: 3
};

export interface IConfig {
    KRAKEN_API_ENDPOINT: string;
    API_VERISON: number | string;
    DEFAULT_TIMEOUT: number;
    RETRY_COUNT: number;
}

export class Config {

    static config: IConfig = DefaultConfig;

    get config(): IConfig {
        return Config.config
    }

    set config(config: IConfig) {
        Config.config = extend(Config.config, config);
    }
}