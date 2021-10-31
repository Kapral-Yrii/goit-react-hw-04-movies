import s from './MovieDetailsReviews.module.css'
import PropTypes  from 'prop-types'


export default function MovieDetailsReviews({ reviews }) {
    return (
        <ul>
            {reviews.map(e => {
                return (
                    <li key={e.id}>
                        <h3 className={s.author}>Author: {e.author}</h3>
                        {e.author_details.rating && (<p className={s.rating}>Rating: {e.author_details.rating}</p>)}
                        <p>{e.content}</p>
                    </li>
                    )
                })}
        </ul>
    )
}

MovieDetailsReviews.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            author: PropTypes.string,
            rating: PropTypes.number,
            content: PropTypes.string
        })
    )
}