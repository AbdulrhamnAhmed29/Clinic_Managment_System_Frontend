import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetCurrantUser } from "../../features/usersManagment/hooks/useGetCurrantUser";
import { hasPermission } from "./hasPermission";

function ProtectedRoute({ allowedRoles, permission, children }) {
    const location = useLocation();
    const { user: userResponse, isLoading, isError } = useGetCurrantUser();
    const user = userResponse?.user ?? userResponse;

    if (isLoading) {
        return <div>Loading.... </div>;
    }

    if (isError || !user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    const roleIsAllowed = allowedRoles === undefined || allowedRoles.includes(user.role);
    const permissionIsAllowed = !permission || hasPermission(user.role, permission);

    if (!roleIsAllowed || !permissionIsAllowed) {
        return <Navigate to="/dashboard" replace state={{ from: location }} />;
    }

    return children ?? <Outlet />;
}

export default ProtectedRoute;