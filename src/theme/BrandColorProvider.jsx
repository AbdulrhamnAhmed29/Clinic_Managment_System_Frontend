import { useEffect, useState } from "react";
import { BrandColorContext } from "./brandColorStore";

export const defaultBrandColors = {
    primary: "#7bea00",
    secondary: "#37c96b",
};

const storageKey = "healthcare-brand-colors";
const isHexColor = (value) =>
    typeof value === "string" && /^#[\da-f]{6}$/i.test(value);

function getSavedColors() {
    try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
        return {
            primary: isHexColor(saved.primary) ? saved.primary : defaultBrandColors.primary,
            secondary: isHexColor(saved.secondary) ? saved.secondary : defaultBrandColors.secondary,
        };
    } catch (error) {
        console.error("Could not load saved brand colors.", error);
        return defaultBrandColors;
    }
}

export function BrandColorProvider({ children }) {
    const [colors, setColors] = useState(getSavedColors);

    useEffect(() => {
        document.documentElement.style.setProperty("--brand-primary", colors.primary);
        document.documentElement.style.setProperty("--brand-secondary", colors.secondary);
    }, [colors]);

    function updateColor(name, value) {
        if (!Object.hasOwn(defaultBrandColors, name) || !isHexColor(value)) {
            throw new Error("Invalid brand color.");
        }

        const nextColors = { ...colors, [name]: value };
        localStorage.setItem(storageKey, JSON.stringify(nextColors));
        setColors(nextColors);
    }

    function resetColors() {
        localStorage.setItem(storageKey, JSON.stringify(defaultBrandColors));
        setColors(defaultBrandColors);
    }

    return (
        <BrandColorContext.Provider value={{ colors, updateColor, resetColors }}>
            {children}
        </BrandColorContext.Provider>
    );
}
