import { useState, useEffect, useCallback, useRef } from "react";
import MovieFetch from "../../services/MovieFetch";
import MoviesList from '../MoviesList/MoviesList'
import s from '../MoviesPage/MoviesPage.module.css'

const endPoint = 'search/movie'
const MovieFetchInMoviePage = new MovieFetch(endPoint)


export default function MoviePage() {
    const [movies, setMovies] = useState()
    const [inputValue, setInputValue] = useState('')
    const submitForm = useRef(false)
    console.log(movies);
    useEffect(() => {
        if (!submitForm.current) {
            return
        }
        MovieFetchInMoviePage.searchQuery = inputValue
        console.log(MovieFetchInMoviePage.searchQuery);
        MovieFetchInMoviePage.getMovies()
            .then(data => {
                setMovies(data.data.results)
                submitForm.current = !submitForm.current
            })
    }, [inputValue])

    const handleInputValue = useCallback((e) => {
        e.preventDefault()
        setInputValue(e.target[0].value)
        submitForm.current = !submitForm.current
    }, [])
    
    return (
        <>
            <form onSubmit={handleInputValue} className={s.form}>
                <input type="text"/>
                <button type="submit">Search</button>
            </form>
            {movies && (<MoviesList moviesArr={movies}/>)}
        </>
    )
}