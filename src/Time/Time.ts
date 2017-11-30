import {KrakenEndoints} from '../Clients/KrakenEndpoints';
import {Client} from '../Util/DefaultClient';
import {IClientOpts, IKrakenResponse} from '../common/interfaces';

const endpointPath = KrakenEndoints.Time;

export class Time extends Client {

    constructor(opts?: IClientOpts, client?) {
        super(opts, client)
    }

    getTime(callback?) {
        return new Promise((resolve, reject) => {
            this.client.get(endpointPath)
                .then((body: IKrakenResponse<any>) => {

                    resolve(body.result);
                })
                .catch(reject);

        }).then((response) => {

            if (typeof callback === 'function') {
                callback(response)
            }

            return response
        })
    }

    getUnixTime(callback?) {
        return this.getTime()
            .then((response) => {
                const unixTime = response['unixtime'];
                if (typeof callback === 'function') {
                    callback(unixTime);
                }
                return unixTime
            })
    }

    getTimeInRfc1123(callback?) {
        return this.getTime()
            .then((response) => {
                const unixTime = response['rfc1123'];

                if (typeof callback === 'function') {
                    callback(unixTime);
                }

                return unixTime;
            })
    }
}
