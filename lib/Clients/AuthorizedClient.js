const KRAKEN_API_ENDPOINT_URL = require('../Config').KRAKEN_API_ENDPOINT;
const request = require('request-promise');
const MessageSignature = require('./MessageSignature');
const messageSignature = new MessageSignature();
const qs = require('querystring');

class AuthorizedClient {

    constructor({apiKey, apiSecret, otp}) {

        this.apiKey = apiKey;
        messageSignature.setSecret(apiSecret);
    }

    post(path, message) {
        return this.request('POST', path, message);
    }

    request(method, path, message) {
        const nonce = this.getNonce();

        let data = Object.assign(message, {nonce: nonce});

        const _messageSignature = messageSignature.getSignature(path, data, nonce);
        const url = KRAKEN_API_ENDPOINT_URL + path;

        const options = {
            headers: {
                'User-Agent': 'Kraken Javascript API Client',
                'API-Key': this.apiKey,
                'API-Sign': _messageSignature
            },
            method: method.toUpperCase(),
            uri: url
        };

        if (method.toLowerCase() === 'get') {
            options.qs = data;
        } else {
            options.body = qs.stringify(data);
        }

        return new Promise((resolve, reject) => {

            request(options)
                .then((body) => {

                    if (body.error && body.error.length > 0) {
                        return reject(body);
                    }

                    resolve(body);
                })
                .catch(e => reject(e))
        });

    }

    getNonce() {
        return new Date() * 1000;
    }
}

module.exports = AuthorizedClient;
