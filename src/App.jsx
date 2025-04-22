import { Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./templates/Home";
import Works from "./templates/Works";
import SingleWork from "./templates/SingleWork";
import Contact from "./templates/Contact";
import About from "./templates/About";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
    const location = useLocation();
    const currentPath = location.pathname;

    function getPathName(path) {
        if (path === "/") {
            return "home-page";
        } else if (path === "/works") {
            return "work-page";
        } else if (path === "/about") {
            return "about-page";
        } else if (path === "/contact") {
            return "contact-page";
        } else if (path.includes("/blog/")) {
            return "single-work-page";
        }
    }

    return (
        <>
            <ScrollToTop />
            <Header />
            <main id="main" className={getPathName(currentPath)}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/works" element={<Works />} />
                    <Route path="/blog/:slug" element={<SingleWork />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
