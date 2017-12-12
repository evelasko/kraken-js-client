import * as crypto from 'crypto';
import * as queryString from 'querystring';

export class MessageSignature {

    private secret: Buffer;

    constructor() {}

    setSecret(secret) {

        if (!secret || typeof secret !== 'string') {
            throw new Error('Secret needs to be a non-empty string');
        }

        this.secret = new Buffer(secret, 'base64');
    }

    getSignature(path, request, nonce) {

        if (!this.secret) {
            throw new Error('MessageSignature secret need to be provided for message to be signed')
        }

        const message = queryString.stringify(request);
        let hash = crypto.createHash('sha256');

        /**
         * Had to do this "hack" since ts lint was going crazy
         * @type {any}
         */
        let hmac = crypto.createHmac('sha512', this.secret) as any;
        const hashDigest = hash.update(nonce + message) as any;
        const nHashDigest = hashDigest.digest('binary');
        const hmacDigest = hmac.update(path + nHashDigest, 'binary').digest('base64');

        return hmacDigest;
    }

}
