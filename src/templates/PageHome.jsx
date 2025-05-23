import { useState, useEffect } from "react";
import { restBase } from "../components/Utilities";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import OtherWorks from "../components/OtherWorks";
import chevronDown from "../assets/chevron-down.svg";

function PageHome() {
    const restPath = restBase + "pages/?slug=home&_embed=1";
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [displayName, setDisplayName] = useState(false);
    const [displayTitle, setDisplayTitle] = useState(false);

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
            {isLoaded ? (
                <>
                    <title>Dayna Cho | Portfolio</title>
                    <meta
                        name="description"
                        content={restData[0].yoast_head_json["description"]}
                    />
                    <section className="home-landing">
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
                                    sequence={[
                                        restData[0].acf["name"],
                                        2000,
                                        () => setDisplayTitle(true),
                                    ]}
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
                            className={
                                displayTitle
                                    ? "intro-title show"
                                    : "intro-title hidden"
                            }
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
                                className="scroll-down-btn dark-invert"
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
                        <OtherWorks
                            ids={restData[0].acf["featured_work"]}
                            isCarousel={false}
                        />

                        <Link to={"/works"} className="view-all-works">
                            View All Works
                        </Link>
                    </motion.section>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default PageHome;
