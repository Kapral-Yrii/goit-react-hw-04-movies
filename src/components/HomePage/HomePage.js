import MovieFetch from "../../services/MovieFetch"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const baseURL = 'https://api.themoviedb.org/3'
const endPoint = 'trending'
const apiKey = '77a03e7323b26b25e1b79366e61bb66b'
const MovieFetchInHomePage = new MovieFetch(baseURL, apiKey, endPoint)

export default function HomePage() {
    const [movies, setMovies] = useState([])
    
    useEffect(() => {
        MovieFetchInHomePage.getTrending()
            .then(data => setMovies(data.data.results))
    }, [])
    
    return (
        <>
            <h1>Trending today</h1>
            <ul>
                {movies.map(e => {
                    return (
                        <li key={e.id}>
                            <Link to={`/movies/${e.id}`}>{e.title}</Link>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}