import { Link } from "react-router-dom";
import s from './MoviesList.module.css'
import PropTypes  from 'prop-types'


export default function MoviesList({ moviesArr }) {
    return (
        <ul className={s.list}>
            {moviesArr.map(e => {
                return (
                    <li className={s.item} key={e.id}>
                        <Link to={`/movies/${e.id}`} className={s.link}>
                            <img className={s.image}
                                src={e.poster_path ?
                                    `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${e.poster_path}` :
                                    'https://geodis.com/de/sites/default/files/styles/max_800x800/public/2018-06/404.png?itok=UBITtRYD'} alt={e.title} />
                            <p className={s.title} >{e.title}</p>
                        </Link>
                    </li>
                )
            })}
         </ul>
    )
}

MoviesList.propTypes = {
    moviesArr: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            poster_path: PropTypes.string,
            title: PropTypes.string
        })
    )
}