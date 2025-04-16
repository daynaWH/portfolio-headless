import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { restBase } from "./Utilities";
import FeaturedImage from "./FeaturedImage";
import Toolkit from "./Toolkit";

const OtherProjects = ({ ids }) => {
    const restPath = restBase + `posts?include=${ids.join(",")}&_embed=1`;
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);

    return (
        <>
            {isLoaded ? (
                <section className="related-projects">
                    {restData.map((post) => (
                        <article key={post.id} id={`post-${post.id}`}>
                            {post.featured_media !== 0 && post._embedded && (
                                <FeaturedImage
                                    featuredImageObject={
                                        post._embedded["wp:featuredmedia"][0]
                                    }
                                />
                            )}
                            <h3>{post.title.rendered}</h3>
                            <p>{post.acf["project_subheading"]}</p>
                            <div>
                                {post.acf["toolkit"].map((id) => (
                                    <Toolkit ids={[id]} key={id} />
                                ))}
                            </div>

                            <Link to={`/blog/${post.slug}`}>
                                <button>More Info</button>
                            </Link>
                        </article>
                    ))}
                </section>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default OtherProjects;
