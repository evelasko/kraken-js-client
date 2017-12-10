
import {WinstonAdapter} from './WinstonAdapter';
import {LoggerAdapter, LoggerAdapterConstructor} from './interfaces';

const DEFAULT_LOG_ADAPTER = 'winston';

/**
 * Main Logger Object.
 * By Default it uses the debug-adapter
 */
export class Logger {

    public static DEFAULT_SCOPE = 'Kraken';

    public static addAdapter(key: string, adapter: LoggerAdapterConstructor): void {
        Logger.Adapters.set(key, adapter);
    }

    public static setAdapter(key: string): void {
        const adapter = Logger.Adapters.get(key);
        if (adapter !== undefined) {
            Logger.Adapter = adapter;
        } else {
            console.log(`No log adapter with key ${key} was found!`);
        }
    }

    private static Adapter: LoggerAdapterConstructor;
    private static Adapters: Map<string, LoggerAdapterConstructor> = new Map();

    private scope: string;
    private adapter: LoggerAdapter;

    constructor(scope?: string) {
        this.scope = (scope) ? scope : Logger.DEFAULT_SCOPE;
    }

    public getAdapter(): LoggerAdapter {
        return this.adapter;
    }

    public debug(message: string, ...args: any[]): void {
        this.log('debug', message, args);
    }

    public info(message: string, ...args: any[]): void {
        this.log('info', message, args);
    }

    public warn(message: string, ...args: any[]): void {
        this.log('warn', message, args);
    }

    public error(message: string, ...args: any[]): void {
        this.log('error', message, args);
    }

    private log(level: string, message: string, args: any[]): void {
        this.lazyLoadAdapter();
        if (this.adapter) {
            this.adapter[level](message, args);
        }
    }

    private lazyLoadAdapter(): void {
        if (!this.adapter) {
            if (Logger.Adapter) {
                this.adapter = new Logger.Adapter(this.scope);
            } else {
                console.log('Please add a log adapter in the LoggerConfig!');
            }
        }
    }

}

Logger.addAdapter(DEFAULT_LOG_ADAPTER, WinstonAdapter);
Logger.setAdapter(DEFAULT_LOG_ADAPTER);
