import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { restBase } from "../components/Utilities";

const Contact = () => {
    const restPath = restBase + "pages/15";
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
                    <title>{`${restData.title.rendered}`}</title>
                    <article id={`post-${restData.id}`}>
                        <h1>{restData.title.rendered}</h1>
                        <div
                            className="entry-content"
                            dangerouslySetInnerHTML={{
                                __html: restData.content.rendered,
                            }}
                        ></div>
                        {/* <div
                            className="entry-content"
                            dangerouslySetInnerHTML={{
                                __html: restData.meta.email_address,
                            }}
                        ></div> */}
                    </article>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Contact;
