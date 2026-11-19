import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelectorAll("main").forEach((main) => {
        main.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        scrollToTop();
    }, [pathname]);

    return null;
}

export default ScrollToTop;