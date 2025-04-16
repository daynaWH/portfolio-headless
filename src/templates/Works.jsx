import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { restBase } from "../components/Utilities";
import FeaturedImage from "../components/FeaturedImage";
import Toolkit from "../components/Toolkit";

const Works = () => {
    const restPath = restBase + "posts?_embed=1";
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
                <>
                    <title>My Work</title>
                    <h1>My Work</h1>

                    {restData.map((post) => (
                        <article key={post.id} id={`post-${post.id}`}>
                            {post.featured_media !== 0 && post._embedded && (
                                <FeaturedImage
                                    featuredImageObject={
                                        post._embedded["wp:featuredmedia"][0]
                                    }
                                />
                            )}
                            <h2>{post.title.rendered}</h2>
                            {post.acf["project_subheading"]}
                            <div>
                                {post.acf["toolkit"].map((id) => (
                                    <Toolkit ids={[id]} key={id} />
                                ))}
                            </div>
                            <Link to={`/blog/${post.slug}`}>More Info</Link>
                        </article>
                    ))}
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Works;
