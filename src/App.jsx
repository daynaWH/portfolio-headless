import { Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./templates/Home";
import Works from "./templates/Works";
import SingleWork from "./templates/SingleWork";
import Contact from "./templates/Contact";
import About from "./templates/About";
import NotFound from "./templates/NotFound";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import ParticlesBackground from "./components/ParticlesBackground";
import ToggleTheme from "./components/ToggleTheme";

function App() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [isOn, setIsOn] = useState(false);

    function getPathName(path) {
        if (path === "/") {
            return "home-page";
        } else if (path === "/works") {
            return "work-page";
        } else if (path === "/about") {
            return "about-page";
        } else if (path === "/contact") {
            return "contact-page";
        } else if (path.includes("/work/")) {
            return "single-work-page";
        } else {
            return "page-not-found";
        }
    }

    return (
        <div className="App" data-theme={isOn ? "dark" : "light"}>
            <ScrollToTop />
            <ParticlesBackground theme={isOn ? "dark" : "light"} />
            <ToggleTheme isOn={isOn} onToggle={() => setIsOn(!isOn)} />
            <Header theme={isOn ? "dark" : "light"} />
            <main id="main" className={getPathName(currentPath)}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/works" element={<Works />} />
                    <Route path="/work/:slug" element={<SingleWork />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
