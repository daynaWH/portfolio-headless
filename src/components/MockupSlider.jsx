// Mockup Slider displaying images from ACF Gallery

import { useState, useEffect } from "react";
import { restBase } from "./Utilities";
import { motion, AnimatePresence } from "framer-motion";

function MockupSlider({ ids }) {
    const restPath =
        restBase + `media?include=${ids.join(",")}&order=asc&_embed=1`;
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState("null");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        }
        fetchData();
    }, [restPath]);

    // Pagination dots for vertical slider
    const handleDotClick = (index) => {
        setDirection(index > activeIndex ? "down" : "up");
        setActiveIndex(index);
    };

    const variants = {
        enter: (direction) => ({
            y: direction === "down" ? -100 : 100,
            opacity: 0,
        }),
        center: {
            y: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            y: direction === "up" ? 100 : -100,
            opacity: 0,
        }),
    };

    return (
        <div className="hero-slider">
            {isLoaded && (
                <>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.figure
                            key={activeIndex}
                            transition={{ duration: 0.3 }}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                        >
                            <img
                                src={restData[activeIndex].source_url}
                                width={
                                    restData[activeIndex].media_details.sizes
                                        .full.width
                                }
                                height={
                                    restData[activeIndex].media_details.sizes
                                        .full.height
                                }
                                alt={restData[activeIndex].alt_text}
                                srcSet={`${restData[activeIndex].source_url} ${
                                    restData[activeIndex].media_details.sizes
                                        .full.width
                                }w,
                                        ${
                                            restData[activeIndex].media_details
                                                .sizes.large?.source_url ?? ""
                                        } 1024w,
                                        ${
                                            restData[activeIndex].media_details
                                                .sizes.medium_large
                                                ?.source_url ?? ""
                                        } 768w,
                                        ${
                                            restData[activeIndex].media_details
                                                .sizes.medium?.source_url ?? ""
                                        } 300w
                                    `}
                                sizes={`(max-width: ${restData[activeIndex].media_details.sizes.full.width}) 100vw, ${restData[activeIndex].media_details.sizes.full.width}px`}
                            />
                        </motion.figure>
                    </AnimatePresence>
                    <div className="slider-btns">
                        {restData.map((media, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    handleDotClick(index);
                                }}
                                className={
                                    index === activeIndex ? "active" : "default"
                                }
                            ></button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default MockupSlider;
