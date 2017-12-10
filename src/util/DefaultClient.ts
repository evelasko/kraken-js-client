import {HttpClient} from '../clients';

export class Client {

    protected client: HttpClient;

    constructor(protected opts: any, client?: HttpClient) {

        this.opts = opts || {};

        if (client instanceof HttpClient) {
            this.client = client;
        } else {
            this.client = new HttpClient(opts.auth, opts.http);
        }

    }

}