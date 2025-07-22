import { useState, useEffect } from "react";
import { restBase } from "../components/Utilities";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../components/Loading";
import OtherWorks from "../components/OtherWorks";
import Toolkit from "../components/Toolkit";
import Collaborators from "../components/Collaborators";
import MockupSlider from "../components/MockupSlider";
import chevronDown from "../assets/chevron-down.svg";

function PageSingleWork() {
    const { slug } = useParams();
    const restPath = restBase + `posts?slug=${slug}&_embed=1`;
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});

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

    const toggleSection = (sectionIndex, sectionType) => {
        const key = `${sectionIndex}-${sectionType}`;
        setExpandedSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const AccordionSection = ({
        title,
        content,
        sectionIndex,
        sectionType,
    }) => {
        const key = `${sectionIndex}-${sectionType}`;
        const isExpanded = expandedSections[key];

        return (
            <div className="accordion-section">
                <button
                    className="accordion-header"
                    onClick={() => toggleSection(sectionIndex, sectionType)}
                >
                    <h3>{title}</h3>
                    <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="accordion-arrow"
                    >
                        <img
                            src={chevronDown}
                            alt="Scroll Down"
                            className="accordion-toggle-arrow"
                        />
                    </motion.span>
                </button>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="accordion-content"
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: content,
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

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
                        <div className="toolkit-collaborators-wrapper work-content">
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

                        {restData.acf["project_insight"].map(
                            (section, index) => (
                                <div
                                    key={index}
                                    className={"project-details work-content"}
                                >
                                    <AccordionSection
                                        title="Technical Implementation"
                                        content={
                                            section["technical_implementation"]
                                        }
                                        sectionIndex={index}
                                        sectionType="implementation"
                                    />
                                    <AccordionSection
                                        title="Key Features"
                                        content={section["key_features"]}
                                        sectionIndex={index}
                                        sectionType="features"
                                    />
                                    <AccordionSection
                                        title="Development Insights"
                                        content={
                                            section["development_insights"]
                                        }
                                        sectionIndex={index}
                                        sectionType="insights"
                                    />
                                </div>
                            )
                        )}
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
