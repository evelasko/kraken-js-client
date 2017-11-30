
import {IHttpClientOpts} from '../clients/HttpClient';

export interface IClientOpts {
    auth?: IAuthOpts;
    http?: IHttpClientOpts;
}

export interface IAuthOpts {
    apiKey: string;
    apiSecret: string;
}

export interface IKrakenResponse<T> {
    result: T;
    error: string[];
}

export interface IOtp {
    otp?: string | number;
}
