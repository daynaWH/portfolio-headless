import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo-light.svg";
import Nav from "./Nav";

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);

    function toggleNav() {
        setNavOpen(!navOpen);
    }

    function isDesktop(e) {
        if (e.matches) {
            setNavOpen(false);
        }
    }

    useEffect(() => {
        let mediaQuery = window.matchMedia("(min-width: 48em)");
        mediaQuery.addEventListener("change", isDesktop);
        return () => mediaQuery.removeEventListener("change", isDesktop);
    }, []);

    return (
        <header className={navOpen ? "site-header show" : "site-header hide"}>
            <Link to="/">
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            <Nav handleNavToggle={toggleNav} />
            <button
                className="nav-btn"
                onMouseDown={(e) => {
                    e.preventDefault();
                }}
                onClick={toggleNav}
            >
                <span className="nav-line"></span>
                <span className="nav-line"></span>
                <span className="nav-line"></span>
            </button>
        </header>
    );
};

export default Header;
