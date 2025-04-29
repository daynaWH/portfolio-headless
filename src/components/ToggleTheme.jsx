import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import { motion } from "framer-motion";

function ToggleTheme({ isOn, onToggle }) {
    return (
        <motion.div
            className="toggle-container"
            style={{
                display: "flex",
                // justifyContent: isOn ? "flex-end" : "flex-start",
                justifyContent: "space-around",
                borderRadius: "2rem",
                width: "4.5rem",
                padding: "2px",
                background: isOn ? "fff" : "000",
                border: isOn ? "2px solid white" : "2px solid black",
            }}
            onClick={() => onToggle(!isOn)}
        >
            {isOn && (
                <img src={moon} width="20px" style={{ filter: "invert(1)" }} />
            )}
            <motion.div
                layout
                className="theme-toggle-btn"
                style={{
                    height: "2rem",
                    width: "2rem",
                    background: isOn ? "white" : "black",
                    borderRadius: "50%",
                    border: isOn ? "2px solid black" : "2px solid white",
                }}
            />
            {!isOn && <img src={sun} width="20px" />}
        </motion.div>
    );
}

export default ToggleTheme;
