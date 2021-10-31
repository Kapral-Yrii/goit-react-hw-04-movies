import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieFetch from "../../services/MovieFetch";
import s from './MovieDetailsPage.module.css'

const baseURL = 'https://api.themoviedb.org/3'
const endPoint = 'movie'
const apiKey = '77a03e7323b26b25e1b79366e61bb66b'
const MovieFetchInHomePage = new MovieFetch(baseURL, apiKey, endPoint)

export default function MovieDetailsPage() {
    const { moviesid } = useParams()
    const [movie, setMovie] = useState()
    
    useEffect(() => {
        MovieFetchInHomePage.movieId = moviesid
        MovieFetchInHomePage.getMovieDetails()
            .then(data =>
                setMovie(data.data)
                // console.log(data)
            )
    }, [moviesid])


    // console.log(movie);
    return (
        <>
            { movie && (
                <>
                <button type="button">← Go back</button>
                <img className={s.image} src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`} alt={movie.title} />
                <h2>{movie.title}</h2>
                <p>User Score: {movie.vote_average}</p>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
                <h3>Genres</h3>
                <ul>
                    {movie.genres.map(e => {
                        return (
                            <li key={e.id}>{e.name}</li>
                        )
                    })}
                </ul>
            </>
            )}
        </>
    )
}