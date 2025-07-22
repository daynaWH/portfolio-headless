// Mockup Slider displaying images from ACF Gallery

import { useState, useEffect, useRef, useCallback } from "react";
import { restBase } from "./Utilities";
import { motion, AnimatePresence } from "framer-motion";

function MockupSlider({ ids, autoPlay = false, autoPlayInterval = 4000 }) {
    const restPath =
        restBase + `media?include=${ids.join(",")}&order=asc&_embed=1`;
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

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

    // Navigation functions
    const goToSlide = (index) => {
        if (index === activeIndex) return;

        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    const goToNext = () => {
        const nextIndex =
            activeIndex === restData.length - 1 ? 0 : activeIndex + 1;
        goToSlide(nextIndex);
    };

    const goToPrev = () => {
        const prevIndex =
            activeIndex === 0 ? restData.length - 1 : activeIndex - 1;
        goToSlide(prevIndex);
    };

    // Touch handlers
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const distance = touchStartX.current - touchEndX.current;
        const threshold = 50; // Minimum swipe distance

        if (Math.abs(distance) > threshold) {
            if (distance > 0) {
                goToNext();
            } else {
                goToPrev();
            }
        }

        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    // Animation variants
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95,
        }),
    };

    if (!isLoaded || !restData.length) {
        return <div className="hero-slider loading">Loading images...</div>;
    }

    return (
        <div
            className="hero-slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            tabIndex={0}
            aria-label="Image slideshow"
        >
            {isLoaded && (
                <div className="slider-container">
                    <AnimatePresence
                        initial={false}
                        custom={direction}
                        mode="wait"
                    >
                        <motion.figure
                            key={activeIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: {
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                },
                                opacity: { duration: 0.3 },
                                scale: { duration: 0.3 },
                            }}
                            drag="x"
                            // dragConstraints={{ left: 0, right: 0 }}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={(e, { offset }) => {
                                setIsDragging(false);
                                const swipe = Math.abs(offset.x) > 50;
                                if (swipe) {
                                    if (offset.x > 0) {
                                        goToPrev();
                                    } else {
                                        goToNext();
                                    }
                                }
                            }}
                            className="slider-image"
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

                    {/* Navigation arrows for desktop */}
                    {/* {restData.length > 1 && (
                        <>
                            <button
                                className="slider-nav slider-nav-prev"
                                onClick={goToPrev}
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polyline points="15,18 9,12 15,6"></polyline>
                                </svg>
                            </button>
                            <button
                                className="slider-nav slider-nav-next"
                                onClick={goToNext}
                                aria-label="Next image"
                                type="button"
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polyline points="9,18 15,12 9,6"></polyline>
                                </svg>
                            </button>
                        </>
                    )} */}

                    {/* Pagination dots */}
                    {restData.length > 1 && (
                        <div className="slider-pagination">
                            {restData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`pagination-dot ${
                                        index === activeIndex ? "active" : ""
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                    type="button"
                                />
                            ))}
                        </div>
                    )}

                    {/* Progress bar (optional) */}
                    {/* {autoPlay && (
                        <div className="slider-progress">
                            <motion.div
                                className="slider-progress-bar"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{
                                    duration: autoPlayInterval / 1000,
                                    ease: "linear",
                                }}
                                key={activeIndex}
                            />
                        </div>
                    )} */}

                    {/* Image counter */}
                    <div className="slider-counter">
                        {activeIndex + 1} / {restData.length}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MockupSlider;
