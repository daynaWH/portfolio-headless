import { useState, useEffect } from "react";
import { restBase } from "../components/Utilities";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import OtherWorks from "../components/OtherWorks";
import Toolkit from "../components/Toolkit";
import Collaborators from "../components/Collaborators";
import MockupSlider from "../components/MockupSlider";
import ProjectDetailsAccordion from "../components/ProjectDetailsAccordion";

function PageSingleWork() {
    const { slug } = useParams();
    const restPath = restBase + `posts?slug=${slug}&_embed=1`;
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setData(data[0]);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        }
        fetchData();
    }, [restPath]);

    return (
        <>
            {isLoaded && restData && restData.acf ? (
                <>
                    <title>{`${restData.acf["work_title"]} | ${restData.title.rendered}`}</title>
                    <meta
                        name="description"
                        content={restData.yoast_head_json["description"]}
                    />
                    <article id={`post-${restData.id}`}>
                        <h1>{restData.acf["work_title"]}</h1>
                        <h2 className="subheading">
                            {restData.acf["work_subheading"]}
                        </h2>
                        <MockupSlider ids={restData.acf["mockup_images"]} />
                        <div className="work-external-links">
                            <div className="external-links-btns">
                                <Link
                                    to={restData.acf["live_site"]}
                                    className="btn"
                                    target="_blank"
                                >
                                    View Live
                                </Link>
                                <Link
                                    to={restData.acf["github_link"]}
                                    className="btn"
                                    target="_blank"
                                >
                                    GitHub
                                </Link>
                            </div>
                            <div className="site-pw-wrapper">
                                {restData.acf["site_password"] && (
                                    <p className="site-pw">
                                        Live site password:{" "}
                                        <code>
                                            {restData.acf["site_password"]}
                                        </code>
                                    </p>
                                )}
                            </div>
                        </div>
                        <div
                            className={
                                restData.acf["site_password"]
                                    ? " toolkit-collaborators-wrapper work-content has-pw"
                                    : "toolkit-collaborators-wrapper work-content no-pw"
                            }
                        >
                            <div className="work-toolkit work-content">
                                <h2>Toolkit</h2>
                                <Toolkit ids={restData.acf["toolkit"]} />
                            </div>
                            {restData.acf["collaborators"].length > 0 && (
                                <div className="collaborators work-content">
                                    <h2>Collaborator(s)</h2>
                                    {restData.acf["collaborators"].map((id) => (
                                        <Collaborators ids={[id]} key={id} />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="overview work-content">
                            <h2>Overview</h2>
                            <div
                                className="entry-content"
                                dangerouslySetInnerHTML={{
                                    __html: restData.acf["overview"],
                                }}
                            ></div>
                        </div>

                        <ProjectDetailsAccordion
                            project={restData.acf["project_insight"]}
                        />

                        <div className="other-works">
                            <h2>View Other Works</h2>
                            <OtherWorks
                                ids={restData.acf["other_works"]}
                                isCarousel={true}
                            />
                            <Link to={"/works"} className="view-all-works">
                                View All Works
                            </Link>
                        </div>
                    </article>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default PageSingleWork;
