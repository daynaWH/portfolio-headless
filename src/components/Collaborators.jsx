// Render collaborators from work details ACF

import { useState, useEffect } from "react";
import { restBase } from "./Utilities";

function Collaborators({ ids }) {
    const restPath = restBase + `tags?include=${ids.join(",")}&_embed`;
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

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
}

export default Collaborators;
