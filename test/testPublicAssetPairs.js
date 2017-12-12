const n = require('./nock/nockPublicEndpointsMocks');
const AssetPairs = require('../lib/index').AssetPairs;

describe('AssetPairs', function () {

    const assetsPairs = new AssetPairs();

    it('should return multiple assets pairs', function () {
        return assetsPairs.getAllAssetPairs()
            .then((response) => {
                const rawAssetPairs = response.result;
                const assetPairs = Object.keys(rawAssetPairs);

                expect(assetPairs).toBeInstanceOf(Array);
                expect(assetPairs.length).toBeGreaterThan(1);
            });
    });

    it('should return selected assets pairs', function () {
        const selectedAssetPairs = ['XBTEUR', 'XBTUSD', 'ETHEUR'];
        return assetsPairs.getAssetPairs(selectedAssetPairs)
            .then((response) => {
                const rawAssetPairs = response.result;
                const assetPairs = Object.keys(rawAssetPairs);
                expect(assetPairs).toBeInstanceOf(Array);
                expect(assetPairs.length).toEqual(selectedAssetPairs.length);
            });
    });

    it('should return single selected asset pair', function () {
        const selectedAssetPair = 'XBTEUR';
        return assetsPairs.getSingleAssetPair(selectedAssetPair)
            .then((response) => {
                const rawAssetPairs = response.result;
                const assetPairs = Object.keys(rawAssetPairs);

                expect(assetPairs).toBeInstanceOf(Array);
                expect(assetPairs.length).toEqual(1);
            });
    });

});
