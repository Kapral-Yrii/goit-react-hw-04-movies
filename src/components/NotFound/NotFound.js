import { Link } from "react-router-dom";
import s from './NotFound.module.css'

export default function NotFound() {
    return (
        <>
            <Link to="/">
                <button type="button" className={s.button}>← Back to Home</button>
            </Link>
            <p>Page not found! Please back to Home</p>
        </>
    )
}