/**
 * A simple example of a service that takes some constructor arguments and
 * exposes public methods.
 */
export class ExampleService {

    private apiBaseUrl = 'https://api.example.com';
    private headers: {[key: string]: string};

    constructor(
        private accountId: string,
        private accessToken: string
    ) {
        this.headers = {
            'X-Auth-Token': accessToken,
            'X-Account-ID': accountId,
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json',
        };
    }

    async getData(query: string): Promise<any> {
        return await fetch(`${this.apiBaseUrl}?query=${query}`, {headers: this.headers})
            .then(res => res.json())
            .then(res => res.data);
    }

}