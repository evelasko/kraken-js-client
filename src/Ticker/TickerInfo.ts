import {get, includes} from 'lodash';
import {TickerParts} from './TickerParts';

const MODULE_NAME = '[Kraken:Ticker:Info]';

export class TickerInfo {

    rawTickerInfo: any;
    tickerPair: string;

    constructor(rawTickerInfo, tickerPair) {
        this.rawTickerInfo = rawTickerInfo;
        this.tickerPair = tickerPair;
    }

    getAskPrice() {
        return parseFloat(this.getPart(TickerParts.AskPrice));
    }

    getBidPrice() {
        return parseFloat(this.getPart(TickerParts.BidPrice));
    }

    getPairName() {
        return this.tickerPair;
    }

    getRawData() {
        return {
            [this.tickerPair]: this.rawTickerInfo
        };
    }

    getParts(parts) {
        let partsData: Array<any> = [];
        if (!parts || !Array.isArray(parts)) {
            throw new Error(MODULE_NAME + '`parts` argument need to be an non-empty array');
        }

        parts.forEach(part => {
            if (!includes(TickerParts, part)) {
                throw new Error(MODULE_NAME + 'Value `' + part + '` is not supported by TickerInfo');
            }

            const partValue: any = get(this.rawTickerInfo, part);
            partsData.push(partValue);
        });

        return partsData;
    }

    getPart(part) {
        return this.getParts([part])[0];
    }

}

