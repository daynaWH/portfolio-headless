import { useState, useEffect } from "react";
import { restBase } from "../components/Utilities";
import { TypeAnimation } from "react-type-animation";
import Loading from "../components/Loading";
import Toolkit from "../components/Toolkit";

function PageAbout() {
    const restPath = restBase + "pages/13?_embed=1";
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

    useEffect(() => {
        if (!isLoaded) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        });
        const hiddenElements = document.querySelectorAll(".hidden");
        return hiddenElements.forEach((el) => observer.observe(el));
    }, [isLoaded]);

    return (
        <>
            {isLoaded ? (
                <>
                    <title>{`${restData.title.rendered}`}</title>
                    <h1>{restData.title.rendered}</h1>
                    <div id={`post-${restData.id}`} className="hidden">
                        <article
                            className="entry-content"
                            dangerouslySetInnerHTML={{
                                __html: restData.content.rendered,
                            }}
                        ></article>
                    </div>
                    <div className="hidden">
                        <h2>Toolkit</h2>
                        <Toolkit
                            ids={restData.acf["toolkit"]}
                            isGrouped={true}
                        />
                    </div>
                    <TypeAnimation
                        sequence={[
                            "When I'm not coding, I'm probably travelling",
                            1000,
                            "When I'm not coding, I also play guitar",
                            1000,
                            "When I'm not coding, I like snowboarding when there's ❄️",
                            1000,
                            "When I'm not coding, I also like longboarding",
                            1000,
                            "When I'm not coding, I try to knit as well!",
                            1000,
                        ]}
                        speed={30}
                        repeat={Infinity}
                        className="hobbies"
                    />
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default PageAbout;
