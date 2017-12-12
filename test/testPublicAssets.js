const assert = require('chai').assert;
const KrakenAssets = require('../lib/index').Assets;
const nock = require('./nock/nockPublicEndpointsMocks');

describe('Kraken Assets Endpoint', function () {

    const krakenAssets = new KrakenAssets();

    it('should get all assets', function () {
        return krakenAssets.getAllAssets()
            .then(response => {
                const assets = response.result;
                const assetsCount = Object.keys(assets).length;
                return expect(assetsCount).toBeGreaterThan(2);
            })
            .catch((e) => {
                console.log(e);
                throw Error('Error getting all assets');
            });
    });

    it('should get only get selected assets', function () {
        const selectedAssets = ['XBT', 'ETH'];
        return krakenAssets.getAssets(selectedAssets)
            .then(response => {
                const assets = response.result;
                const assetsCount = Object.keys(assets).length;
                expect(assetsCount).toEqual(selectedAssets.length);
            });
    });

    it('should get only one selected asset', function () {
        const selectedAsset = 'XBT';
        return krakenAssets.getSingleAsset(selectedAsset)
            .then(response => {
                const asset = response.result;
                const assetsCount = Object.keys(asset).length;
                expect(assetsCount).toEqual(1);
            });
    });

    it('should fail when non-string assets keys are used', function () {
        const malformedAssetsArray = [1, {}, function () {}];
        assert.throws(() => {
            krakenAssets.getAssets(malformedAssetsArray);
        });
    });

    it('should fail to get single asset when empty string or malformed input is used', function () {
        assert.throws(() => {
            const emptyAssetId = '';
            krakenAssets.getAsset(emptyAssetId);
        });

        assert.throws(() => {
            const malformedAssetId = {'malformed': 'input'};
            krakenAssets.getAsset(malformedAssetId);
        });

    });

});