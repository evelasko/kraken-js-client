const KrakenTime = require('../lib/index').Time;
const nockTime = require('./nock/nockPublicEndpointsMocks');

describe('Kraken Connectivity', function () {

    describe('Kraken Time connectivity', function () {

        it('should send valid time', function () {

            const allowedTimeDiscrepancy = 3600; // An hour
            const localUnixTimeStamp = Math.floor(new Date() / 1000);
            const referenceTimestamp = localUnixTimeStamp - allowedTimeDiscrepancy;
            const krakenTime = new KrakenTime();

            return krakenTime.getUnixTime()
                .then((unixTime) => {
                    expect(unixTime).toBeGreaterThan(referenceTimestamp);
                }).catch((e) => {
                    throw e;
                });

        });

    });

});