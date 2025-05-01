import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import { restBase } from "../components/Utilities";
import OtherProjects from "../components/OtherProjects";
import Toolkit from "../components/Toolkit";
import Collaborators from "../components/Collaborators";
import MockupSlider from "../components/MockupSlider";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

function SingleWork() {
    const { slug } = useParams();
    const restPath = restBase + `posts?slug=${slug}&_embed=1`;
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
                    <title>{`${restData.acf["project_title"]} | ${restData.title.rendered}`}</title>
                    <article id={`post-${restData.id}`}>
                        <h1>{restData.acf["project_title"]}</h1>
                        <h2 className="subheading">
                            {restData.acf["project_subheading"]}
                        </h2>
                        <MockupSlider ids={restData.acf["mockup_images"]} />
                        <div className="work-external-links">
                            <Link
                                to={restData.acf["live_site"]}
                                className="btn"
                            >
                                View Live
                            </Link>
                            <Link
                                to={restData.acf["github_link"]}
                                className="btn"
                            >
                                GitHub
                            </Link>
                        </div>
                        <div className="toolkit-collaborators-wrapper">
                            <div className="work-toolkit">
                                <h2>Toolkit</h2>
                                <Toolkit ids={restData.acf["toolkit"]} />
                            </div>
                            {restData.acf["collaborators"].length > 0 && (
                                <div className="collaborators">
                                    <h2>Collaborator(s)</h2>
                                    {restData.acf["collaborators"].map((id) => (
                                        <Collaborators ids={[id]} key={id} />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="overview">
                            <h2>Overview</h2>
                            <div
                                className="entry-content"
                                dangerouslySetInnerHTML={{
                                    __html: restData.acf["overview"],
                                }}
                            ></div>
                        </div>
                        {restData.acf["project_insight"].map(
                            (section, index) => (
                                <Tabs
                                    key={index}
                                    className={"reflection-table"}
                                >
                                    <TabList className="tablist">
                                        <Tab className="submenu">
                                            Requirements
                                        </Tab>
                                        <Tab className="submenu">Features</Tab>
                                        <Tab className="submenu">
                                            Reflection
                                        </Tab>
                                    </TabList>
                                    <TabPanel>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: section["requirements"],
                                            }}
                                        ></div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: section["features"],
                                            }}
                                        ></div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: section["reflection"],
                                            }}
                                        ></div>
                                    </TabPanel>
                                </Tabs>
                            )
                        )}
                        <div className="related-projects">
                            <h2>View Other Works</h2>
                            {/* <div className="carousel"> */}
                            {/* {restData.acf["other_projects"].map((id) => ( */}
                            <OtherProjects
                                ids={restData.acf["other_projects"]}
                                isCarousel={true}
                            />
                            <Link to={"/works"} className="view-all-works">
                                View All Works
                            </Link>
                            {/* ))} */}
                            {/* </div> */}
                        </div>
                    </article>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default SingleWork;
