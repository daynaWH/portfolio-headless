import { NavLink } from "react-router-dom";

function Nav({ handleNavToggle }) {
    function closeNav(e) {
        if (window.innerWidth < 768) {
            handleNavToggle();
        }
    }
    return (
        <nav className="site-navigation" onClick={closeNav}>
            <ul className="nav-links">
                <li>
                    <NavLink to="/works">Work</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About Me</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
