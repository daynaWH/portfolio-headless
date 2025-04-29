import { useState, useEffect } from "react";
// import Loading from "./Loading";
import { restBase } from "./Utilities";
import shopifyIcon from "../assets/shopify-icon.svg";

function Toolkit({ ids, isGrouped }) {
    const restPath = restBase + `categories?include=${ids.join(",")}&embed=1`;
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

    function renderTool(tool) {
        return (
            <>
                {tool.slug === "shopify" ? (
                    <img src={shopifyIcon} className="shopify-icon" />
                ) : (
                    <i className={`devicon-${tool.slug}-plain colored`}></i>
                )}
                {tool.name}
            </>
        );
    }

    function groupTools(tools) {
        const parentCategories = tools.filter((tool) => tool.parent === 0);
        const childCategories = tools.filter((tool) => tool.parent !== 0);

        return parentCategories.map((parent) => {
            const children = childCategories.filter(
                (child) => child.parent === parent.id
            );

            return (
                <div key={parent.id} className="tool-group ">
                    <h3>{parent.name}</h3>
                    <div className="tool-list">
                        {children.map((child) => (
                            <div key={child.id} className="tool-item">
                                {renderTool(child)}
                            </div>
                        ))}
                    </div>
                </div>
            );
        });
    }

    return (
        <div className="toolkit">
            {isLoaded && (
                <>
                    {isGrouped
                        ? groupTools(restData)
                        : restData.map((tool) => (
                              <div key={tool.id} id={`tool-${tool.id}`}>
                                  {renderTool(tool)}
                              </div>
                          ))}
                </>
            )}
        </div>
    );
}

export default Toolkit;
