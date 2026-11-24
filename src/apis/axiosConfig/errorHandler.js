import { toast } from "sonner";

/**
 * ERROR HANDELR 
 */
export function handleAxiosError(error) {
  if (error.response) {
    const { status, data } = error.response;
    // UN AUTHNTICATED
    if (status === 401) {
      if (window.location.pathname !== "/login") {
        toast.error("انتهت جلستك، يرجى تسجيل الدخول مرة أخرى.");
        window.location.href = "/login";
      }
    }

    // UN AUTHORIZED
    if (status === 403) {
      toast.error("غير مسموح! ليس لديك صلاحية للقيام بهذا الإجراء.");
    }
    if (status === 409) {
      toast.error("هذا المستخدم موجود مسبقاً");
    }
    if (status >= 500) {
      toast.error("تحقق من السيرفر، حدث خطأ داخلي.");
    }

    return {
      status,
      message: data?.message || "حدث خطأ غير متوقع في السيرفر.",
      errors: data?.errors,
      isNetworkError: false,
    };
  }

  //Timeout
  const isTimeout = error.code === "ECONNABORTED";
  return {
    message: isTimeout
      ? "انتهت مهلة الاتصال بالسيرفر، تأكد من سرعة الإنترنت وحاول مرة أخرى."
      : "تعذر الاتصال بالسيرفر، تأكد من اتصالك بالإنترنت.",
    isNetworkError: true,
  };
}