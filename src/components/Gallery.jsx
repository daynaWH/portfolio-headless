import { useState, useEffect } from "react";
import Loading from "./Loading";
import { restBase } from "./Utilities";

const Toolkit = ({ ids }) => {
    const restPath = restBase + `media?include=${ids.join(",")}&_embed`;
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
                    {restData.map((media) => (
                        // <figure className="featured-image">
                        <img
                            key={media.id}
                            src={media.source_url}
                            width={media.media_details.sizes.full.width}
                            height={media.media_details.sizes.full.height}
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
                        // </figure>
                    ))}
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Toolkit;
