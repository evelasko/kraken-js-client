import {forEach} from 'lodash';
import {IOHLCResponse} from './OHLC';
import {OHLCParts} from './OHLCParts';

export interface IOHLCTick {
    time: string;
    open: string;
    close: string;
    high: string;
    low: string;
    volumeWeightedAveragePrice: string;
    volume: string;
    count: string;
}

export class OHLCInfo {

    private _data: string[][];
    private pair: string;

    constructor(data: IOHLCResponse) {
        const pair: string = Object.keys(data)[0];
        this.pair = pair;
        this._data = data[this.pair];
    }

    parse(): IOHLCTick[] {
        const data: IOHLCTick[] = [];

        forEach(this._data, (d) => {

            const p: IOHLCTick = {
                time: d[OHLCParts.Time],
                open: d[OHLCParts.Open],
                close: d[OHLCParts.Close],
                high: d[OHLCParts.High],
                low: d[OHLCParts.Low],
                volumeWeightedAveragePrice: d[OHLCParts.VolumeWeightedAveragePrice],
                volume: d[OHLCParts.Volume],
                count: d[OHLCParts.Count],
            };

            data.push(p);
        });

        return data;
    }

    getPair(): string {
        return this.pair;
    }

    getRaw(): string[][] {
        return this._data;
    }

}
