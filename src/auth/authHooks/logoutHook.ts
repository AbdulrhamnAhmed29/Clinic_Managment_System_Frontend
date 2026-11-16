import { logout } from "../authServices/logoutServices";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogout = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: () => logout.create({}),
        onSuccess: () => {
            toast.success("تم تسجيل الخروج بنجاح")
            navigate("/login")
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "حدث خطأ ما، حاول مرة أخرى";
            toast.error(errorMessage);
        }
    })
}