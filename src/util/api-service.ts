import axios from "axios";
import Cookies from "js-cookie";

export default class ApiService {
    private BASE_URL = "https://api.cert.tastyworks.com";
    private SEARCH_URL = "https://api.tastyworks.com";

    private session = Cookies.get("session");

    private default_headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": this.session || "",
    };

    constructor() {}

    loginUser(username, password): Promise<any> {
        let url = this.BASE_URL + "/sessions";
        let headers = this.default_headers;
        return axios.post(
            url,
            { login: username, password: password },
            { headers }
        );
    }

    logoutUser(): Promise<any> {
        let url = this.BASE_URL + "/sessions";
        let headers = this.default_headers;
        return axios.delete(url, { headers });
    }

    searchSymbol(symbol): Promise<any> {
        let url = this.SEARCH_URL + `/symbols/search/${symbol}`;
        let headers = this.default_headers;
        return axios.get(url, { headers });
    }

    addNewWatchlist(watchlist): Promise<any> {
        let url = this.BASE_URL + "/watchlists";
        this.default_headers.Authorization = this.session;
        let headers = this.default_headers;
        return axios.post(url, watchlist, { headers });
    }

    getWatchlists(): Promise<any> {
        let url = this.BASE_URL + "/watchlists";
        this.default_headers.Authorization = this.session;
        let headers = this.default_headers;
        return axios.get(url, { headers });
    }

    getWatchlist(watchlist): Promise<any> {
        let url = this.BASE_URL + `/watchlists/${watchlist}`;
        this.default_headers.Authorization = this.session;
        let headers = this.default_headers;
        return axios.get(url, { headers });
    }

    updateWatchlist(watchlist): Promise<any> {
        let url = this.BASE_URL + `/watchlists/${watchlist.name}`;
        this.default_headers.Authorization = this.session;
        let headers = this.default_headers;
        return axios.put(url, watchlist, { headers });
    }

    deleteWatchlist(watchlist): Promise<any> {
        let url = this.BASE_URL + `/watchlists/${watchlist}`;
        this.default_headers.Authorization = this.session;
        let headers = this.default_headers;
        return axios.delete(url, { headers });
    }

    getMarketData(symbol): Promise<any> {
        let url = this.BASE_URL + `/market-data/${symbol}`;
        this.default_headers.Authorization = this.session;
        let headers = this.default_headers;
        return axios.get(url, { headers });
    }
}
