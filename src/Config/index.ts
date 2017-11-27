/**
 * Internal Client Configuration
 */

export const Config = {
    KRAKEN_API_ENDPOINT: 'https://api.kraken.com',
    API_VERISON: 0,
    DEFAULT_TIMEOUT: 200, // 0.2s
    RETRY_COUNT: 3
};

interface IConfig {
    KRAKEN_API_ENDPOINT: string;
    API_VERISON: number | string;
    DEFAULT_TIMEOUT: number;
    RETRY_COUNT: number;
}

class Cfg {

    private config: IConfig;

    constructor(config: IConfig) {
        this.config = config;
    }

    set(key: string, value: any) {
        this.config[key] = value;
        return value;
    }

    get(key: string) {
        return this.config[key] || null;
    }

    getConfig(): IConfig {
        return this.config;
    }

}