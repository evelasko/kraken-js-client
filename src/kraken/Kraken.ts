
import {IAuthOpts} from '../Clients/HttpClient';

export interface IKrakenConfiguration {

}



export class KrakenAPI {

    private auth: IAuthOpts;
    private opts: IKrakenConfiguration;

    constructor(opts: IKrakenConfiguration, auth?: IAuthOpts) {
        this.opts = opts || {};

        if (auth) {
            this.auth = auth
        }

        this.mountApis();
    }

    public withAuth(auth: IAuthOpts): KrakenAPI {
        return new KrakenAPI(this.opts, auth);
    }

    private mountApis(): void {

    }
}