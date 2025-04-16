import { useState, useEffect } from "react";
import Loading from "./Loading";
import { restBase } from "./Utilities";

const Toolkit = ({ ids }) => {
    const restPath = restBase + `categories?include=${ids.join(",")}&_embed`;
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
                    {restData.map((tool) => (
                        <div key={tool.id} id={`tool-${tool.id}`}>
                            {tool.name}
                        </div>
                    ))}
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Toolkit;
