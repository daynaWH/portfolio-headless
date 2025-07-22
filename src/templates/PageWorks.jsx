import { useState, useEffect } from "react";
import { restBase } from "../components/Utilities";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import WorkCard from "../components/WorkCard";

function PageWorks() {
    const restPath = restBase + "pages/11?_embed=1";
    const workPath = restBase + "posts?_embed=1";
    const [restData, setData] = useState(null);
    const [workData, setWorkData] = useState([]);
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
        async function fetchData() {
            const response = await fetch(workPath);
            if (response.ok) {
                const data = await response.json();
                setWorkData(data);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        }
        fetchData();
    }, [workPath]);

    return (
        <>
            {isLoaded && restData && restData.yoast_head_json ? (
                <>
                    <title
                        dangerouslySetInnerHTML={{
                            __html: restData.yoast_head_json["title"],
                        }}
                    ></title>
                    <meta
                        name="description"
                        content={restData.yoast_head_json["description"]}
                    />
                    <h1>My Work</h1>
                    {workData.map((post, index) => (
                        <motion.div
                            key={post.id}
                            id={`post-${post.id}`}
                            className="work-card-wrapper"
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: {
                                    delay: 0.1 * index,
                                    duration: 0.5,
                                },
                            }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <WorkCard post={post} />
                        </motion.div>
                    ))}
                </>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default PageWorks;
