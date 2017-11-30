import {extend} from 'lodash';
import {HttpClient} from '../Clients/HttpClient';

import {Assets} from '../assets/Assets';
import {AssetPairs} from '../assets/AssetPairs';

import {Time} from '../time/Time';
import {Ticker} from '../ticker/Ticker';

import {OHLC} from '../ohlc/OHLC';

import {Balance} from '../account/Balance';
import {Trades} from '../account/Trades/Trades';

import {Orders} from '../account/Orders/Orders';
import {OpenPositions} from '../account/OpenPositions';
import {Resolver} from '../resolver/Resolver';
import {Ledgers} from '../account/Ledgers/Ledgers';
import {Config, IConfig} from '../config/index';
import {IAuthOpts, IClientOpts} from '../common/interfaces';

export interface IKrakenConfiguration {
    retryCount?: number;
    retryDelay?: number;
    apiUrl?: string;
    apiVersion?: string;
    logLevel?: string;
}

interface IKrakenOpts extends IClientOpts, IKrakenConfiguration {}

export class Kraken {

    private auth: IAuthOpts;
    private opts: IKrakenOpts;
    private clientOpts: IClientOpts;

    private client: HttpClient;

    public Assets: Assets;
    public AssetPairs: AssetPairs;

    public Time: Time;
    public Ticker: Ticker;

    public OHLC: OHLC;

    public Balance: Balance;
    public Trades: Trades;

    public Orders: Orders;
    public OpenPositions: OpenPositions;
    public Resolver: Resolver;

    public Ledgers: Ledgers;

    constructor(opts?: IKrakenConfiguration, auth?: IAuthOpts) {
        // store original opts passed
        this.opts = opts || {};

        let config: IConfig = {};

        if (this.opts.retryCount) {
            config.RETRY_COUNT = this.opts.retryCount
        }

        if (this.opts.retryDelay) {
            config.DEFAULT_TIMEOUT = this.opts.retryDelay
        }

        if (this.opts.apiUrl) {
            config.KRAKEN_API_ENDPOINT = this.opts.apiUrl
        }

        if (this.opts.apiVersion) {
            config.API_VERISON = this.opts.apiVersion
        }

        if (this.opts.logLevel) {
            config.LOG_LEVEL = this.opts.logLevel
        }

        Config.config = config;

        if (auth) {
            this.auth = auth;
        }

        this.clientOpts = extend({}, this.opts, {
            auth: this.auth,
            http: {
                retryDelay: Config.config.DEFAULT_TIMEOUT,
                retryCount: Config.config.RETRY_COUNT
            }
        });

        this.client = new HttpClient(this.auth, this.clientOpts.http);

        this.mountApis();
    }

    public withAuth(auth: IAuthOpts): Kraken {
        this.client.updateAuth(auth);
        return this;
    }

    private mountApis(): void {
        this.Assets = new Assets(this.opts, this.client);
        this.AssetPairs = new AssetPairs(this.opts, this.client);

        this.Time = new Time(this.opts, this.client);
        this.Ticker = new Ticker(this.opts, this.client);

        this.OHLC = new OHLC(this.opts, this.client);

        this.Balance = new Balance(this.opts, this.client);
        this.Trades = new Trades(this.opts, this.client);

        this.Orders = new Orders(this.opts, this.client);
        this.OpenPositions = new OpenPositions(this.opts, this.client);

        this.Ledgers = new Ledgers(this.opts, this.client);
    }

}
