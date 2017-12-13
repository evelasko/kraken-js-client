import {HttpClient} from '../clients';

export class Client {

    protected client: HttpClient;

    constructor(protected opts: any = {}, client?: HttpClient) {

        if (client instanceof HttpClient) {
            this.client = client;
        } else {
            this.client = new HttpClient(this.opts.auth, opts.http);
        }

    }

}
