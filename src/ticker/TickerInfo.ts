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

    getAskPrice(): number {
        return parseFloat(this.getPart(TickerParts.AskPrice));
    }

    getBidPrice(): number {
        return parseFloat(this.getPart(TickerParts.BidPrice));
    }

    getPairName(): string {
        return this.tickerPair;
    }

    getRawData() {
        return {
            [this.tickerPair]: this.rawTickerInfo,
        };
    }

    getParts(parts: string[]): any[] {
        const partsData: string[] = [];
        if (!parts || !Array.isArray(parts)) {
            throw new Error(MODULE_NAME + '`parts` argument need to be an non-empty array');
        }

        parts.forEach(part => {
            if (!includes(TickerParts, part)) {
                throw new Error(MODULE_NAME + 'Value `' + part + '` is not supported by TickerInfo');
            }

            const partValue: string = get(this.rawTickerInfo, part);
            partsData.push(partValue);
        });

        return partsData;
    }

    getPart(part: string) {
        return this.getParts([part])[0];
    }

}
