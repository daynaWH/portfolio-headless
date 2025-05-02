import { Link } from "react-router-dom";
import paperPlane from "../assets/cursor.svg";
import ErrorImg from "../assets/404-img.svg";

function PageNotFound() {
    return (
        <>
            <h1>404</h1>
            <section>
                <img
                    src={ErrorImg}
                    alt="Sad Face Image"
                    className="error-img"
                />
                <h2>Oops... Page Not Found :(</h2>
                <p>Seems like this page didn't make the deploy.</p>
                <p>
                    Plot a new course to the{" "}
                    <Link to="/">
                        Landing page{" "}
                        <img
                            src={paperPlane}
                            alt="Cursor-shaped Paperplane"
                            className="cursor-plane dark-invert"
                        />
                    </Link>
                </p>
            </section>
        </>
    );
}

export default PageNotFound;
