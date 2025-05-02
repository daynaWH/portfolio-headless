import linkedinIcon from "../assets/icon-linkedin.svg";
import githubIcon from "../assets/icon-github.svg";
import emailIcon from "../assets/icon-email.svg";

function Footer() {
    return (
        <footer>
            <p className="copyright">
                &copy; {new Date().getFullYear()} | Dayna Cho
            </p>
            <div className="social-icons">
                <a href="https://www.linkedin.com/in/daynacho/">
                    <img
                        src={linkedinIcon}
                        alt="LinkedIn Icon"
                        className="dark-invert"
                    />
                </a>
                <a href="https://github.com/daynaWH">
                    <img
                        src={githubIcon}
                        alt="GitHub Icon"
                        className="dark-invert"
                    />
                </a>
                <a href="mailto:dayna.cho119@gmail.com">
                    <img
                        src={emailIcon}
                        alt="Email Icon"
                        className="dark-invert"
                    />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
