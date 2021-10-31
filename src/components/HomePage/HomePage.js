import MovieFetch from "../../services/MovieFetch"
import { useEffect, useState } from "react"
import s from './HomePage.module.css'
import MoviesList from '../MoviesList/MoviesList'

const endPoint = 'trending/movie/day'
const MovieFetchInHomePage = new MovieFetch(endPoint)

export default function HomePage() {
    const [movies, setMovies] = useState([])
    
    useEffect(() => {
        MovieFetchInHomePage.getTrending()
            .then(data =>setMovies(data.data.results))
    }, [])
    
    return (
        <>
            <h1 className={s.title}>Trending today</h1>
            {movies && (<MoviesList moviesArr={movies}/>)}
        </>
    )
}