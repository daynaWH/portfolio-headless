import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/normalize.css";
// import "./css/index.css";
import "./scss/styles.scss";
import { BrowserRouter } from "react-router-dom";
import "devicon/devicon.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
