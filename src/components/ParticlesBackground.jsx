// Customize animated background using tsParticles for both light and dark themes

import { useCallback } from "react";
import { loadStarsPreset } from "tsparticles-preset-stars";
import Particles from "react-tsparticles";

function ParticlesBackground({ theme }) {
    const particlesInit = useCallback(async (engine) => {
        await loadStarsPreset(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                preset: "stars",
                background: {
                    color: theme === "dark" ? "#05090f" : "#f7f7f7",
                },
                fullScreen: {
                    enable: true,
                    zIndex: -100,
                },
                particles: {
                    color: theme === "dark" ? "#f7f7f7" : "#99b4bf",
                    size: {
                        value: {
                            min: 1,
                            max: 5,
                        },
                    },
                    number: {
                        value: 100,
                    },
                    twinkle: {
                        particles: {
                            enable: true,
                            frequency: 1,
                            opacity: 1,
                        },
                    },
                    move: {
                        enable: true,
                        speed: 0.6,
                        random: true,
                        direction: theme === "dark" ? "" : "bottom",
                    },
                },
            }}
        />
    );
}

export default ParticlesBackground;
