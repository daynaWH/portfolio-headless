import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { restBase } from "../components/Utilities";
import OtherProjects from "../components/OtherProjects";

const Home = () => {
    const restPath = restBase + "pages/?slug=home&embed=1";
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
                    <title>Dayna's Portfolio</title>
                    <article id={`${restData[0].slug}`}>
                        <div
                            className="entry-content"
                            dangerouslySetInnerHTML={{
                                __html: restData[0].content.rendered,
                            }}
                        ></div>
                        {restData[0].acf["featured_work"].map((id) => (
                            <OtherProjects ids={[id]} key={id} />
                        ))}

                        <div className="view-all-works">
                            <Link to={"/works"}>View All Works</Link>
                        </div>
                    </article>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Home;
