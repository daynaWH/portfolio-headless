// Dark/Light theme toggle using framer motion

import { motion } from "framer-motion";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";

function ToggleTheme({ isOn, onToggle }) {
    return (
        <motion.div
            className="toggle-container"
            style={{
                border: isOn ? "2px solid white" : "2px solid black",
            }}
            onClick={() => onToggle(!isOn)}
        >
            {isOn && (
                <img
                    src={moon}
                    alt="Moon icon"
                    width="20px"
                    style={{ filter: "invert(1)" }}
                />
            )}
            <motion.div
                layout="position"
                className="theme-toggle-btn"
                style={{
                    background: isOn ? "white" : "black",
                    border: isOn ? "2px solid black" : "2px solid white",
                }}
            />
            {!isOn && <img src={sun} alt="Sun icon" width="20px" />}
        </motion.div>
    );
}

export default ToggleTheme;
