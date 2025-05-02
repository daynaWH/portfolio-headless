// Loading gif that displays while the components are being rendered

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Loading() {
    return (
        <div className="loading-container">
            <DotLottieReact
                src="https://lottie.host/528c9978-1373-417d-9957-925b1c25e32f/R6tkAqYKF8.lottie"
                loop
                autoplay
                style={{
                    maxWidth: "25rem",
                    maxHeight: "25rem",
                }}
            />
        </div>
    );
}

export default Loading;
