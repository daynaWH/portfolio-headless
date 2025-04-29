import { useState, useEffect, useRef } from "react";
// import Loading from "./Loading";
import { restBase } from "./Utilities";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import arrowCarousel from "../assets/arrow-carousel.svg";

function OtherProjects({ ids, isCarousel }) {
    const restPath = restBase + `posts?include=${ids.join(",")}&_embed=1`;
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    const even = restData.length % 2 === 0;
    const [activeIndex, setActiveIndex] = useState(
        Math.floor(restData.length / 2)
    );
    const [transform, setTransform] = useState(even ? -250 : 0);

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

    useEffect(() => {
        if (restData.length > 0) {
            const even = restData.length % 2 === 0;
            setActiveIndex(Math.floor(restData.length / 2));
            setTransform(even ? -250 : 0);
        }
    }, [restData]);

    function slide(direction) {
        if (direction === "left" && activeIndex !== 0) {
            setActiveIndex(activeIndex - 1);
            setTransform(transform + 520);
        } else if (
            direction === "right" &&
            activeIndex !== restData.length - 1
        ) {
            setActiveIndex(activeIndex + 1);
            setTransform(transform - 520);
        }
    }

    return (
        <>
            {isCarousel ? (
                // Based on the following reference: https://webtips.dev/animated-carousel-in-react
                <div className="carousel-wrapper">
                    <div
                        className={even ? "carousel even" : "carousel"}
                        style={{ transform: `translateX(${transform}px)` }}
                    >
                        {restData.map((post, index) => (
                            <ProjectCard
                                post={post}
                                key={post.id}
                                className={
                                    index === activeIndex ? "active" : ""
                                }
                            />
                        ))}
                    </div>
                    <div className="slider-btns">
                        <button
                            className={
                                activeIndex === 0 ? "left disabled" : "left"
                            }
                            onClick={() => slide("left")}
                        >
                            <img src={arrowCarousel} alt="Arrow Left" />
                        </button>
                        <button
                            className={
                                activeIndex === restData.length - 1
                                    ? "right disabled"
                                    : "right"
                            }
                            onClick={() => slide("right")}
                        >
                            <img src={arrowCarousel} alt="Arrow Right" />
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {restData.map((post, index) => (
                        <motion.div
                            key={post.id}
                            className="project-card"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                                transition: {
                                    delay: 0.2 * index,
                                    duration: 0.5,
                                },
                            }}
                            viewport={{ once: false, amount: 0.5 }}
                        >
                            <ProjectCard post={post} />
                        </motion.div>
                    ))}
                    {/* <ProjectCard key={post.id} post={post} /> */}
                </>
            )}
        </>
    );
}

export default OtherProjects;
