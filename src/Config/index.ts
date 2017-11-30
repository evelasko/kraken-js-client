import {extend} from 'lodash';

/**
 * Internal Client Configuration
 */

export const DefaultConfig = {
    KRAKEN_API_ENDPOINT: 'https://api.kraken.com',
    API_VERISON: 0,
    DEFAULT_TIMEOUT: 200, // 0.2s
    RETRY_COUNT: 3,
    LOG_LEVEL: 'info'
};

export interface IConfig {
    KRAKEN_API_ENDPOINT?: string;
    API_VERISON?: number | string;
    DEFAULT_TIMEOUT?: number;
    RETRY_COUNT?: number;
    LOG_LEVEL?: string
}

/**
 * Static Config
 */
export class Config {

    static _config: IConfig = DefaultConfig;

    static get config(): IConfig {
        return Config._config;
    }

    static set config(config: IConfig) {
        Config._config = extend(Config._config, config);
    }

}