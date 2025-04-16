import { Route, Routes, Link, NavLink } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./templates/Home";
import Works from "./templates/Works";
import SingleWork from "./templates/SingleWork";
import Contact from "./templates/Contact";
import About from "./templates/About";
import Logo from "./assets/logo-light.svg";

function App() {
    return (
        <>
            <ScrollToTop />
            <header id="masthead" className="site-header">
                <div className="site-branding">
                    {/* <p className="site-title">Mindset Headless</p> */}
                </div>
                <nav className="site-navigation">
                    <ul>
                        <li>
                            <NavLink to="/" end>
                                <img src={Logo} alt="Logo" />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/works">Work</NavLink>
                        </li>
                        <li>
                            {/* <NavLink to="/page/13">About</NavLink> */}
                            <NavLink to="/about">About Me</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <main id="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/works" element={<Works />} />
                    <Route path="/blog/:slug" element={<SingleWork />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
            <footer>
                {/* <div
                    className="entry-content"
                    dangerouslySetInnerHTML={{
                        __html: restData.meta.copyright_date,
                    }}
                ></div> */}

                <p className="copyright">2025 | Dayna Cho</p>
                {/* Social icons */}
            </footer>
        </>
    );
}

export default App;
