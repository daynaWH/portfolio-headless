import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { restBase } from "../components/Utilities";

const Contact = () => {
    const restPath = restBase + "pages/15?_embed=1";
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

    useEffect(() => {
        if (!isLoaded) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );
        const hiddenElements = document.querySelectorAll(".hidden");
        return hiddenElements.forEach((el) => observer.observe(el));
    }, [isLoaded]);

    useEffect(() => {
        const emailBlock = document.querySelector(".email-to-copy");

        if (emailBlock) {
            emailBlock.addEventListener("click", () => {
                const textToCopy = emailBlock.innerText;
                navigator.clipboard.writeText(textToCopy);
                emailBlock.innerText = "Copied!";
                setTimeout(() => {
                    emailBlock.innerText = textToCopy;
                }, 1000);
            });
        }
    });

    return (
        <>
            {isLoaded ? (
                <>
                    <title>{`${restData.title.rendered}`}</title>
                    <section id={`post-${restData.id}`}>
                        <h1>{restData.title.rendered}</h1>
                        <div
                            className="entry-content hidden"
                            dangerouslySetInnerHTML={{
                                __html: restData.content.rendered,
                            }}
                        ></div>
                    </section>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Contact;
