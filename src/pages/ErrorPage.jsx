import { Link } from "react-router-dom";

export default function ErrorPage () {
    return(
        <>
            <h1>Error accessing the selected path</h1>
            <Link to="/">Return to home</Link>
        </>
    );
}