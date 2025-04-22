import { useState, useEffect } from "react";
import Loading from "./Loading";
import { restBase } from "./Utilities";

function MockupSlider({ ids }) {
    const restPath =
        restBase + `media?include=${ids.join(",")}&order=asc&embed=1`;
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    const [activeIndex, setActiveIndex] = useState(0);

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

    function slideNext() {
        setActiveIndex((val) => {
            if (val >= restData.length - 1) {
                return 0;
            } else {
                return val + 1;
            }
        });
    }

    function slidePrev() {
        setActiveIndex((val) => {
            if (val <= 0) {
                return restData.length - 1;
            } else {
                return val - 1;
            }
        });
    }

    return (
        <div className="hero-slider">
            {isLoaded ? (
                <>
                    {restData.map((media, index) => (
                        <figure
                            className={
                                index === activeIndex ? "slide active" : "slide"
                            }
                            key={index}
                        >
                            {index === activeIndex && (
                                <img
                                    src={media.source_url}
                                    width={media.media_details.sizes.full.width}
                                    height={
                                        media.media_details.sizes.full.height
                                    }
                                    alt={media.alt_text}
                                    srcSet={`${media.source_url} ${
                                        media.media_details.sizes.full.width
                                    }
                                ${
                                    media.media_details.sizes.large
                                        ? media.media_details.sizes.large
                                              .source_url + " 1024w,"
                                        : ""
                                }
                                ${
                                    media.media_details.sizes.medium_large
                                        ? media.media_details.sizes.medium_large
                                              .source_url + " 768w,"
                                        : ""
                                }
                                ${
                                    media.media_details.sizes.medium
                                        ? media.media_details.sizes.medium
                                              .source_url + " 300w"
                                        : ""
                                }`}
                                    sizes={`(max-width: ${media.media_details.sizes.full.width}) 100vw, ${media.media_details.sizes.full.width}px`}
                                />
                            )}
                        </figure>
                    ))}

                    <div className="slider-btns">
                        {restData.map((media, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setActiveIndex(index);
                                }}
                                className={
                                    index === activeIndex ? "active" : "default"
                                }
                            ></button>
                        ))}
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default MockupSlider;
