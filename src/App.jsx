import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageHome from "./templates/PageHome";
import PageWorks from "./templates/PageWorks";
import PageSingleWork from "./templates/PageSingleWork";
import PageContact from "./templates/PageContact";
import PageAbout from "./templates/PageAbout";
import PageNotFound from "./templates/PageNotFound";
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
                    <Route path="/" element={<PageHome />} />
                    <Route path="/works" element={<PageWorks />} />
                    <Route path="/work/:slug" element={<PageSingleWork />} />
                    <Route path="/about" element={<PageAbout />} />
                    <Route path="/contact" element={<PageContact />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
