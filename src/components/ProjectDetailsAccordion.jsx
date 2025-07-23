// Accordion component displaying Project Insight content from ACF flexible content field

import { useState, useEffect } from "react";
import { restBase } from "../components/Utilities";
import { motion, AnimatePresence } from "framer-motion";
import chevronDown from "../assets/chevron-down.svg";

function ProjectDetailsAccordion({ project }) {
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (sectionIndex, sectionType) => {
        const key = `${sectionIndex}-${sectionType}`;
        setExpandedSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const FlexibleContentBlock = ({ layout }) => {
        const [imageData, setImageData] = useState([]);
        const [imagesLoaded, setImagesLoaded] = useState(false);

        useEffect(() => {
            if (
                layout.acf_fc_layout === "design" &&
                layout.images &&
                layout.images.length > 0
            ) {
                async function fetchImages() {
                    const restPath = `${restBase}media?include=${layout.images.join(
                        ","
                    )}&order=asc`;
                    try {
                        const response = await fetch(restPath);
                        if (response.ok) {
                            const data = await response.json();
                            setImageData(data);
                            setImagesLoaded(true);
                        }
                    } catch (error) {
                        console.error("Error fetching images:", error);
                    }
                }
                fetchImages();
            }
        }, [layout]);

        switch (layout.acf_fc_layout) {
            case "development":
                return (
                    <div className="flexible-content-text">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: layout.text_content,
                            }}
                        />
                    </div>
                );

            case "design":
                return (
                    <div className="flexible-content-gallery">
                        {layout.caption && (
                            <p className="gallery-caption">{layout.caption}</p>
                        )}
                        <div className="image-gallery">
                            {imagesLoaded ? (
                                imageData.map((image, index) => (
                                    <img
                                        key={image.id}
                                        src={image.source_url}
                                        alt={
                                            image.alt_text ||
                                            `Design process ${index + 1}`
                                        }
                                        className="gallery-image"
                                        width={
                                            image.media_details.sizes.full
                                                ?.width
                                        }
                                        height={
                                            image.media_details.sizes.full
                                                ?.height
                                        }
                                        srcSet={`${image.source_url} ${
                                            image.media_details.sizes.full
                                                ?.width
                                        }w,
                                                ${
                                                    image.media_details.sizes
                                                        .large?.source_url ?? ""
                                                } 1024w,
                                                ${
                                                    image.media_details.sizes
                                                        .medium_large
                                                        ?.source_url ?? ""
                                                } 768w,
                                                ${
                                                    image.media_details.sizes
                                                        .medium?.source_url ??
                                                    ""
                                                } 300w`}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                ))
                            ) : (
                                <div>Loading images...</div>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const AccordionSection = ({
        title,
        content,
        flexibleContent,
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
                            {flexibleContent && flexibleContent.length > 0 ? (
                                flexibleContent.map((layout, index) => (
                                    <FlexibleContentBlock
                                        key={index}
                                        layout={layout}
                                    />
                                ))
                            ) : (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: content,
                                    }}
                                />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <>
            {project.map((section, index) => (
                <div key={index} className={"project-details work-content"}>
                    <AccordionSection
                        title="Technical Implementation"
                        content={section["technical_implementation"]}
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
                        content={section["development_insights"]}
                        flexibleContent={
                            section["development_insights_content"]
                        }
                        sectionIndex={index}
                        sectionType="insights"
                    />
                </div>
            ))}
        </>
    );
}

export default ProjectDetailsAccordion;
