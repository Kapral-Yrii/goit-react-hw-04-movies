import s from './MovieDetailsCast.module.css'
import PropTypes  from 'prop-types'

export default function MovieDetailsCast({ cast }) {
    return (
        <ul className={s.list}>
            {cast.map(e => {
                return (
                    <li className={s.item} key={e.id}>
                        <img className={s.image}
                            src={e.profile_path ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${e.profile_path}` :
                            'https://geodis.com/de/sites/default/files/styles/max_800x800/public/2018-06/404.png?itok=UBITtRYD'}
                                alt={e.name} />
                        <h3 className={s.title}>{e.name}</h3>
                        <p className={s.title}>Character: {e.character}</p>
                    </li>
                )
            })}
        </ul>
    )
}

MovieDetailsCast.propTypes = {
    cast: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            profile_path: PropTypes.string,
            name: PropTypes.string,
            character: PropTypes.string
        })
    )
}