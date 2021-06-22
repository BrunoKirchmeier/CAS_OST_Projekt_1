export default class HttpService {
    /** Public Methoden */
    async ajax(methode, url, data, headers) {
        this.fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});
        return fetch(url, {
            method: methode,
            headers: this.fetchHeaders,
            body: JSON.stringify(data),
        }).then((result) => {
            const x = result.json();
            return x;
        });
    }
}
