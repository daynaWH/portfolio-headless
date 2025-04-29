import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { restBase } from "../components/Utilities";
import FeaturedImage from "../components/FeaturedImage";
import Toolkit from "../components/Toolkit";
import { motion } from "framer-motion";

function Works() {
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

                    {restData.map((post, index) => (
                        <motion.article
                            key={post.id}
                            id={`post-${post.id}`}
                            className="work-card"
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: {
                                    delay: 0.2 * index,
                                    duration: 0.5,
                                },
                            }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            {post.featured_media !== 0 && post._embedded && (
                                <FeaturedImage
                                    featuredImageObject={
                                        post._embedded["wp:featuredmedia"][0]
                                    }
                                />
                            )}
                            <div className="work-page-card-info">
                                <h2>{post.title.rendered}</h2>
                                {post.acf["project_subheading"]}
                                <div className="work-card-toolkit">
                                    <Toolkit ids={post.acf["toolkit"]} />
                                </div>
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="btn more-info-btn"
                                >
                                    More Info
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Works;
