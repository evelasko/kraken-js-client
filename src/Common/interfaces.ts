
import {IHttpClientOpts} from '../clients/HttpClient';

export interface IClientOpts {
    auth?: IAuthOpts;
    http?: IHttpClientOpts;
}

export interface IAuthOpts {
    apiKey?: string;
    apiSecret?: string;
}

export interface IKrakenResponse {
    result: any;
    error: string[];
}

export interface IOtp {
    otp?: string | number;
}
