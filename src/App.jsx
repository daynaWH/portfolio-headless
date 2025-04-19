import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./templates/Home";
import Works from "./templates/Works";
import SingleWork from "./templates/SingleWork";
import Contact from "./templates/Contact";
import About from "./templates/About";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
    return (
        <>
            <ScrollToTop />
            <Header />
            <main id="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/works" element={<Works />} />
                    <Route path="/blog/:slug" element={<SingleWork />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
            {/* <footer> */}
            <Footer />
        </>
    );
}

export default App;
