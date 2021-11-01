import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { useParams, Link, useRouteMatch, Route, useLocation, useHistory } from "react-router-dom";
import Loader from '../Loader/Loader';
import MovieFetch from "../../services/MovieFetch";
import s from './MovieDetailsPage.module.css'

const MovieDetailsReviews = lazy(() => import('../MovieDetailsReviews/MovieDetailsReviews'))
const MovieDetailsCast = lazy(() => import('../MovieDetailsCast/MoviesDetailsCast'))


const endPoint = 'movie'
const MovieFetchInHomePage = new MovieFetch(endPoint)

export default function MovieDetailsPage() {
    const { moviesid } = useParams()
    const { url } = useRouteMatch()
    const [movie, setMovie] = useState()
    const [cast, setCast] = useState([])
    const [reviews, setReviews] = useState([])
    const fetchCast = useRef(false)
    const fetchReviews = useRef(false)
    const location = useLocation()
    const history = useHistory()

    const handleFetchCast = useCallback(() => fetchCast.current = !fetchCast.current, [])
    const handleFetchReview = useCallback(() => fetchReviews.current = !fetchReviews.current, [])

    const goBackButton = useCallback(() => {
        history.push(location.state.from)
    }, [history, location.state.from])

    useEffect(() => {
        MovieFetchInHomePage.movieId = moviesid
        MovieFetchInHomePage.getMovieDetails()
            .then(data =>setMovie(data.data))
    }, [moviesid])

    useEffect(() => {
        if (!fetchCast.current) {
            return
        }
        MovieFetchInHomePage.getMovieCast()
            .then(data => {
                setCast(data.data.cast) 
                handleFetchCast()}
            )
    })

    useEffect(() => {
        if (!fetchReviews.current) {
            return
        }
        MovieFetchInHomePage.getMovieReview()
            .then(data => {
                setReviews(data.data.results)
                handleFetchReview()}
            )
    })

    return (
        <>
            { movie && (
                <>
                    <button type="button" className={s.buttonBack}
                        onClick={goBackButton}
                    >← Go back</button>
                    <div className={s.movieCard}>
                        <img className={s.image}
                            src={movie.poster_path ?
                                `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` :
                                'https://geodis.com/de/sites/default/files/styles/max_800x800/public/2018-06/404.png?itok=UBITtRYD'} alt={movie.title} />
                        <div>
                           <h2>{movie.title}</h2>
                            <p>User Score: {movie.vote_average}</p>
                            <h3>Overview</h3>
                            <p>{movie.overview}</p>
                            <h3>Genres</h3>
                            <ul className={s.listGenres}>
                                {movie.genres.map(e => {
                                    return (
                                        <li className={s.listGenresItem} key={e.id}>{e.name}</li>
                                    )
                                })}
                            </ul>
                            <p>Additional information</p>
                            <ul className={s.buttonList}>
                                <li>
                                    <Link to={{
                                        pathname: `${url}/cast`,
                                        state: {
                                            from: location.state.from
                                        }
                                    }}>
                                        <button className={s.button} onClick={handleFetchCast}>Cast</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={{
                                        pathname: `${url}/reviews`,
                                        state: {
                                            from: location.state.from
                                        }
                                    }}><button className={s.button} onClick={handleFetchReview}>Reviews</button></Link>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                
            </>
            )}
            <Suspense fallback={<Loader/>}>
                <Route path={`${url}/cast`}>
                    <MovieDetailsCast cast={cast}/>
                </Route>
                <Route path={`${url}/reviews`}>
                    {reviews.length === 0 ? (<p className={s.title}>We don’t have any reviews for this movie</p>) : (<MovieDetailsReviews reviews={reviews}/>)}
                </Route>
            </Suspense>
            
        </>
    )
}