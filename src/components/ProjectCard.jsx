import FeaturedImage from "./FeaturedImage";
import Toolkit from "./Toolkit";
import { Link } from "react-router-dom";
import { useState } from "react";
import chevronRight from "../assets/chevron-right.svg";

function ProjectCard({ post }) {
    const [isHovering, setIsHovering] = useState(false);

    function handleMouseEnter() {
        setIsHovering(true);
    }

    function handleMouseLeave() {
        setIsHovering(false);
    }

    return (
        <article>
            {post.featured_media !== 0 && post._embedded && (
                <FeaturedImage
                    featuredImageObject={post._embedded["wp:featuredmedia"][0]}
                />
            )}
            <div className="work-basic-info">
                <Link to={`/blog/${post.slug}`} className="">
                    <h3>{post.title.rendered}</h3>
                </Link>
                <p>{post.acf["project_subheading"]}</p>
                <div className="work-card-toolkit">
                    <Toolkit ids={post.acf["toolkit"]} />
                </div>

                <Link
                    to={`/blog/${post.slug}`}
                    className="btn more-info-btn"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    More Info
                </Link>
            </div>
        </article>
    );
}

export default ProjectCard;
