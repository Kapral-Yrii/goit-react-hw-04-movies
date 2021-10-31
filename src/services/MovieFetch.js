import axios from "axios"


export default class MovieFetch {
    constructor(endPoint) {
        this.baseURL = 'https://api.themoviedb.org/3';
        this.apiKey = '77a03e7323b26b25e1b79366e61bb66b';
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
        const params = `/${this.endPoint}?api_key=${this.apiKey}`
        return this.getFetch(params)
    }

    getMovieDetails() {
        const params = `/${this.endPoint}/${this.movieId}?api_key=${this.apiKey}`
        return this.getFetch(params)
    }

    getMovies() {
        const params = `/${this.endPoint}?api_key=${this.apiKey}&query=${this._searchQuery}&page=${this._searchPage}`
        return this.getFetch(params) 
    }

    getMovieCast() {
        const params = `/${this.endPoint}/${this.movieId}/credits?api_key=${this.apiKey}`
        return this.getFetch(params)
    }

    getMovieReview() {
        const params = `/${this.endPoint}/${this.movieId}/reviews?api_key=${this.apiKey}`
        return this.getFetch(params)
    }
}