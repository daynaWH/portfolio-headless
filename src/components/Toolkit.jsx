// Render toolkit items added as categories in WP

import { useState, useEffect } from "react";
import { restBase } from "./Utilities";
import shopifyIcon from "../assets/shopify-icon.svg";

function Toolkit({ ids, isGrouped }) {
    const restPath = restBase + `categories?include=${ids.join(",")}&_embed=1`;
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
        async function fetchAll() {
            try {
                // Fetch all children of the given parent IDs
                const allChildren = await Promise.all(
                    ids.map(async (parentId) => {
                        const res = await fetch(
                            `${restBase}categories?parent=${parentId}`
                        );
                        if (!res.ok) return [];
                        const data = await res.json();
                        return { parentId, children: data };
                    })
                );

                // Fetch parent category details
                const parentRes = await fetch(
                    `${restBase}categories?include=${ids.join(",")}`
                );
                const parentData = parentRes.ok ? await parentRes.json() : [];

                const combined = allChildren.flatMap(
                    ({ parentId, children }) => {
                        const parent = parentData.find(
                            (p) => p.id === parentId
                        );
                        return parent
                            ? [{ ...parent, _children: children }]
                            : [];
                    }
                );

                setData(combined);
                setLoadStatus(true);
            } catch (err) {
                console.error("Toolkit fetch failed:", err);
                setLoadStatus(false);
            }
        }

        fetchAll();
    }, [ids]);

    // Render tools with the corresponding icons
    function renderTool(tool) {
        return (
            <>
                {tool.slug === "shopify" ? (
                    <img
                        src={shopifyIcon}
                        className="shopify-icon tool-icon"
                        alt="Shopify Icon"
                    />
                ) : (
                    <i
                        className={`devicon-${tool.slug}-plain colored tool-icon`}
                        title={tool.slug}
                    ></i>
                )}
                <span className="tool-name">{tool.name}</span>
            </>
        );
    }

    // Group child tools below their corresponding parent tools
    function groupTools(tools) {
        return tools
            .filter((tool) => tool._children && tool._children.length > 0)
            .map((tool) => (
                <div key={tool.id} className="tool-group">
                    {tool.parent === 0 && <h3>{tool.name}</h3>}
                    <div className="tool-list">
                        {tool._children.map((child) => (
                            <div key={child.id} className="tool-item">
                                {renderTool(child)}
                            </div>
                        ))}
                    </div>
                </div>
            ));
    }

    return (
        <div className="toolkit">
            {isLoaded && (
                <>
                    {isGrouped
                        ? groupTools(restData)
                        : restData.map((tool) => (
                              <div
                                  key={tool.id}
                                  id={`tool-${tool.id}`}
                                  className="tool-item"
                              >
                                  {renderTool(tool)}
                              </div>
                          ))}
                </>
            )}
        </div>
    );
}

export default Toolkit;
