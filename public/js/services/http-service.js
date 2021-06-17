export default class HttpService {
    /** Public Methoden */
    async ajax(method, url, data, headers) {
        this.fetchHeaders = new Headers({'content-type': 'application/json', ...(headers || {})});
        return fetch(url, {
            method: method,
            headers: this.fetchHeaders,
            body: JSON.stringify(data),
        }).then(x => {
            return x.json();
        });
    }
}
