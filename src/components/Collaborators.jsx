import { useState, useEffect } from "react";
// import Loading from "./Loading";
import { restBase } from "./Utilities";

const Collaborators = ({ ids }) => {
    const restPath = restBase + `tags?include=${ids.join(",")}&_embed`;
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
            {isLoaded &&
                restData.map((collaborator) => (
                    <p key={collaborator.id} id={`tool-${collaborator.id}`}>
                        {collaborator.name}
                    </p>
                ))}
        </>
    );
};

export default Collaborators;
