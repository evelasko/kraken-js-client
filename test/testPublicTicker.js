const assert = require('chai').assert;
const Kraken = require('../lib/index');
const TickerInfo = require('../lib/Ticker/TickerInfo').TickerInfo;
const TickerParts = Kraken.TickerParts;
const nock = require('./nock/nockPublicEndpointsMocks');

describe('Ticker', function () {

    const ticker = new Kraken.Ticker();

    it('should return selected assets pairs', function () {
        const selectedAssetPairs = ['XBTEUR', 'XBTUSD', 'ETHEUR'];
        return ticker.getPairsTickers(selectedAssetPairs)
            .then((tickers) => {
                expect(tickers).toBeInstanceOf(Array);
                expect(tickers.length).toBeGreaterThan(0);
                expect(tickers.length).toEqual(selectedAssetPairs.length);
            })
            .catch((e) => {
                throw new Error('Error while retriveing asset pairs.');
            });
    });

    it('should return single selected asset pair', function () {
        const selectedAssetPair = 'XBTEUR';
        return ticker.getSinglePairTicker(selectedAssetPair)
            .then((tickerInfo) => {

                expect(tickerInfo.getBidPrice())
                    .toBeGreaterThan(0);

                expect(tickerInfo.getAskPrice())
                    .toBeGreaterThan(0);

                const pairName = tickerInfo.getPairName();
                expect(typeof pairName === 'string').toBeTruthy();
                expect(pairName.length).toBeGreaterThan(0);

                const vwapt = tickerInfo.getPart(TickerParts.VolumeWeightedAveragePriceToday);
                expect(Object.keys(vwapt).length).toBeGreaterThan(0);


                expect(typeof tickerInfo.getRawData() === 'object').toBeTruthy();

            })
            .catch((e) => {
                console.log(e);
                throw new Error('Error while testing tickerinfo.');
            });
    });

});