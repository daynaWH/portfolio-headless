import { useState, useEffect } from "react";
import Loading from "./Loading";
import { restBase } from "./Utilities";
import shopifyIcon from "../assets/shopify-icon.svg";

function Toolkit({ ids }) {
    const restPath = restBase + `categories?include=${ids.join(",")}&embed=1`;
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
        <div className="toolkit">
            {isLoaded ? (
                <>
                    {restData.map((tool) => (
                        <div key={tool.id} id={`tool-${tool.id}`}>
                            {tool.slug === "shopify" ? (
                                <img
                                    src={shopifyIcon}
                                    className="shopify-icon"
                                />
                            ) : (
                                <i
                                    className={`devicon-${tool.slug}-plain colored`}
                                ></i>
                            )}
                            {tool.name}
                        </div>
                    ))}
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default Toolkit;
