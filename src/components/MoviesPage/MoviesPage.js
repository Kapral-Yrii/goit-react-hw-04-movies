import { useState, useEffect, useCallback } from "react";
import { useLocation, useHistory } from "react-router";
import MovieFetch from "../../services/MovieFetch";
import MoviesList from '../MoviesList/MoviesList'
import s from '../MoviesPage/MoviesPage.module.css'

const endPoint = 'search/movie'
const MovieFetchInMoviePage = new MovieFetch(endPoint)


export default function MoviePage() {
    const [movies, setMovies] = useState()
    const history = useHistory()
    const location = useLocation()
    const searchQuery = new URLSearchParams(location.search).get('query')

    useEffect(() => {
        if (!searchQuery) {
            setMovies(null)
            return
        }
        MovieFetchInMoviePage.searchQuery = searchQuery
        MovieFetchInMoviePage.getMovies()
            .then(data => {
                if (data.data.results.length === 0) {
                     alert('Nothing found. Please enter a more specific query.')
                }
                setMovies(data.data.results)
            })
    }, [searchQuery])

    const handleInputValue = useCallback((e) => {
        e.preventDefault()
        if (e.target[0].value.trim() === '') {
            return alert('Enter a movie title to search')
        }
        history.push({
                    ...location,
                    search: `query=${e.target[0].value}`
                })
    }, [history, location])
    
    return (
        <>
            <h1 className={s.title}>Search movie</h1>
            <form onSubmit={handleInputValue} className={s.form}>
                <input className={s.input} type="text" placeholder="Enter a title for the movie"/>
                <button className={s.button} type="submit">Search</button>
            </form>
            {movies && (<MoviesList moviesArr={movies}/>)}
        </>
    )
}