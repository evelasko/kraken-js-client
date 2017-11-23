declare module Kraken {

    abstract class Client  {
        get(url: string, message?: any): Promise<any>;
        post(url: string, message?: any): Promise<any>;
    }

    class PublicClient extends Client {}
    class AuthorizedClient extends Client {}

    namespace Account {
        interface Balance {
            get(): Promise<any>;
        }
    }
}
