import  {KrakenEndoints} from '../Clients/KrakenEndpoints';
import {Client} from '../Util/DefaultClient';
import {IClientOpts} from '../common/interfaces';

const endpointPath = KrakenEndoints.Time;

export class Time extends Client {

    constructor(opts?: IClientOpts, client?) {
        super(opts, client)
    }

    getTime(callback?) {
        return new Promise((resolve, reject) => {
            const request = this.client.get(endpointPath);

            request
                .then((response) => {

                if (response.statusCode !== 200) {
                        return reject(response);
                    }

                    resolve(response.body.result);
                })
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
