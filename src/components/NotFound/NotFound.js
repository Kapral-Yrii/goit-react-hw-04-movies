import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
            <Link to="/">
                <button type="button">← Back to Home</button>
            </Link>
            <p>Page not found! Please back to Home</p>
        </>
    )
}