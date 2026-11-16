import { useMutation } from "@tanstack/react-query";
import { login } from "../authServices/loginServices";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
interface loginSchema {
    email: string,
    password: string
}

export const useLogin = (payload: loginSchema) => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: () => login.create(payload),
        onSuccess: () => {
            toast.success("نورت السيستم يا دكتور")
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000)
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حصل خطأ في تسجيل الدخول");
        }
    })
}