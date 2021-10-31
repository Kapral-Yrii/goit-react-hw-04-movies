import axios from "axios"


export default class MovieFetch {
    constructor(baseURL, apiKey, endPoint) {
        this.baseURL = baseURL;
        this.apiKey = apiKey;
        this.endPoint = endPoint;
        this._searchQuery = '';
        this._searchPage = 1;
        this._movieId = null;
    }

    get searchQuery() {
        return this._searchQuery
    }
    set searchQuery(value) {
        return (this._searchQuery = value)
    }
    get searchPage() {
        return this._searchPage
    }
    set searchPage(value) {
        return (this._searchPage = value)
    }
    get movieId() {
        return this._movieId
    }
    set movieId(value) {
        return (this._movieId = value)
    }

    async getFetch(params) {
        axios.defaults.baseURL = this.baseURL
        try {
            const response = await axios.get(params)
            const data = await response
            return data
        } catch (error) {
            console.log(error.message);
        }
    }

    getTrending() {
        const params = `/${this.endPoint}/movie/day?api_key=${this.apiKey}`
        return this.getFetch(params)
    }

    getMovieDetails() {
        const params = `/${this.endPoint}/${this.movieId}?api_key=${this.apiKey}`
        return this.getFetch(params)
    }
}