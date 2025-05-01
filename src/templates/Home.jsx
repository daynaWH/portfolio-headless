import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { restBase } from "../components/Utilities";
import OtherProjects from "../components/OtherProjects";
import { TypeAnimation } from "react-type-animation";
import chevronDown from "../assets/chevron-down.svg";
import { motion } from "framer-motion";

function Home() {
    const restPath = restBase + "pages/?slug=home&_embed=1";
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [displayName, setDisplayName] = useState(false);

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
                    <title>Dayna Cho | Portfolio</title>
                    <section className="home-intro">
                        <article className="intro">
                            <TypeAnimation
                                sequence={[
                                    restData[0].acf["intro_message"].replace(
                                        /\\n/g,
                                        "\n"
                                    ),
                                    300,
                                    () => setDisplayName(true),
                                ]}
                                wrapper="span"
                                className="typewriter"
                                cursor={false}
                                speed={{
                                    type: "keyStrokeDelayInMs",
                                    value: 100,
                                }}
                            />

                            {displayName && (
                                <TypeAnimation
                                    sequence={[restData[0].acf["name"]]}
                                    wrapper="span"
                                    className="typewriter name"
                                    cursor={false}
                                    speed={{
                                        type: "keyStrokeDelayInMs",
                                        value: 100,
                                    }}
                                />
                            )}
                        </article>
                        <div
                            className="intro-title"
                            dangerouslySetInnerHTML={{
                                __html: restData[0].acf["intro_title"].replace(
                                    /\\n/g,
                                    "\n"
                                ),
                            }}
                        ></div>
                        <a href="#featured-work-wrapper">
                            <img
                                src={chevronDown}
                                alt="Scroll Down"
                                className="scroll-down-btn"
                            />
                        </a>
                    </section>

                    <motion.section
                        className="featured-work-wrapper"
                        id="featured-work-wrapper"
                        initial={{ opacity: 0 }}
                        whileInView={{
                            opacity: 1,
                            transition: { duration: 0.5 },
                        }}
                        viewport={{ once: false, amount: 0.5 }}
                    >
                        <h2>Featured Work</h2>
                        {/* <div className="featured-works"> */}
                        <OtherProjects
                            ids={restData[0].acf["featured_work"]}
                            isCarousel={false}
                        />
                        {/* </div> */}

                        {/* <div className="view-all-works"> */}
                        <Link to={"/works"} className="view-all-works">
                            View All Works
                        </Link>
                        {/* </div> */}
                    </motion.section>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Home;
