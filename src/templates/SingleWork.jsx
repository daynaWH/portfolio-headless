import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import { restBase } from "../components/Utilities";
import FeaturedImage from "../components/FeaturedImage";
import OtherProjects from "../components/OtherProjects";
import Toolkit from "../components/Toolkit";
import Collaborators from "../components/Collaborators";
import Gallery from "../components/Gallery";

const SingleWork = () => {
    const { slug } = useParams();
    const restPath = restBase + `posts?slug=${slug}&_embed`;
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setData(data[0]);
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
                        {/* <h2>{restData.acf["project_subheading"]}</h2> */}
                        <div
                            className="entry-content"
                            dangerouslySetInnerHTML={{
                                __html: restData.acf["project_subheading"],
                            }}
                        ></div>
                        {restData.acf["mockup_images"].map((id) => (
                            <Gallery ids={[id]} key={id} />
                        ))}
                        <Link to={restData.acf["live_site"]}>View Live</Link>
                        <Link to={restData.acf["github_link"]}>GitHub</Link>
                        <div>
                            <h2>Toolkit</h2>
                            <div>
                                {restData.acf["toolkit"].map((id) => (
                                    <Toolkit ids={[id]} key={id} />
                                ))}
                            </div>
                        </div>
                        {restData.acf["collaborators"].length > 0 && (
                            <div>
                                <h2>Collaborator(s)</h2>
                                {restData.acf["collaborators"].map((id) => (
                                    <Collaborators ids={[id]} key={id} />
                                ))}
                            </div>
                        )}

                        <div>
                            <h2>Overview</h2>
                            <div
                                className="entry-content"
                                dangerouslySetInnerHTML={{
                                    __html: restData.acf["overview"],
                                }}
                            ></div>
                        </div>
                        <div>
                            {restData.acf["project_insight"].map(
                                (section, index) => (
                                    <section key={index}>
                                        <div>
                                            Requirements:{" "}
                                            {section["requirements"]}
                                        </div>
                                        <div>
                                            Features: {section["features"]}
                                        </div>
                                        <div>
                                            Reflection: {section["reflection"]}
                                        </div>
                                    </section>
                                )
                            )}
                        </div>
                        <div className="related-projects-grid">
                            <h2>View Other Works</h2>
                            {restData.acf["other_projects"].map((id) => (
                                <OtherProjects ids={[id]} key={id} />
                            ))}
                        </div>
                    </article>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default SingleWork;
