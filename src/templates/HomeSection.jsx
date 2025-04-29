import { restBase } from "../components/Utilities";
import OtherProjects from "../components/OtherProjects";
import { TypeAnimation } from "react-type-animation";
import chevronDown from "../assets/chevron-down.svg";

function HomeSection() {
    const restPath = restBase + "pages/?slug=home&_embed=1";
    const [restData, setData] = useState([]);
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
            <title>Dayna's Portfolio</title>
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
                <a href="#featured-work">
                    <img
                        src={chevronDown}
                        alt="Scroll Down"
                        className="scroll-down-btn"
                    />
                </a>
            </section>
            <div className="featured-work" id="featured-work">
                <h2>Featured Work</h2>
                <OtherProjects
                    ids={restData[0].acf["featured_work"]}
                    isCarousel={false}
                />

                <div className="view-all-works">
                    <Link to={"/works"}>View All Works</Link>
                </div>
            </div>
        </>
    );
}

export default HomeSection;
