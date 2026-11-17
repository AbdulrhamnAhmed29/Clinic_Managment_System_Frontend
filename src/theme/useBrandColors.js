import { useContext } from "react";
import { BrandColorContext } from "./brandColorStore";

export function useBrandColors() {
    const context = useContext(BrandColorContext);
    if (!context) {
        throw new Error("useBrandColors must be used inside BrandColorProvider");
    }
    return context;
}
