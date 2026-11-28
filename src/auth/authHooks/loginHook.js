import { useMutation } from "@tanstack/react-query";
import { login } from "../authServices/loginServices";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export const useLogin = () => {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: (payload) => login.create(payload),
        onSuccess: () => {
            toast.success("تم تسجيل الدخول بنجاح")
            navigate("/dashboard");
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    return {
        login: mutation.mutate,
        isPending: mutation.isPending,
        isError: mutation.isError,
    }
}