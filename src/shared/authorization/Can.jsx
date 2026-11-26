
import { hasPermission } from "./hasPermission";
export function Can({ role, permission, children, fallback = null }) {
    const allowed = hasPermission(role, permission);
    if (!allowed) return fallback;
    return children;
}
