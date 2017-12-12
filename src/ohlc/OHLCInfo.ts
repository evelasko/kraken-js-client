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

export interface IOHLCData {
    [key: string]: IOHLCTick[];
}

export class OHLCInfo {

    private _data: IOHLCResponse;
    private pairs: string[];

    constructor(data: IOHLCResponse) {
        const pairs: string[] = Object.keys(data);
        this.pairs = pairs;
        this._data = data;
    }

    parse(): IOHLCData {
        const data: IOHLCData = {};

        forEach(this.pairs, (pair) => {

            data[pair] = [];

            const pairObj = data[pair];

            forEach(this._data[pair], (d) => {

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

                pairObj.push(p);
            });

        });

        return data;
    }

    getPairs(): string[] {
        return this.pairs;
    }

    getRaw(): IOHLCResponse {
        return this._data;
    }

}
