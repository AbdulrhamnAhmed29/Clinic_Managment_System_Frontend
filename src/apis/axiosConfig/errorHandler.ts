import { toast } from "sonner";
import type { AxiosError } from "axios";

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface NormalizedError {
  status?: number;
  message: string;
  errors?: Record<string, string[]>;
  isNetworkError: boolean;
}

/**
 * ERROR HANDELR 
 */
export function handleAxiosError(error: AxiosError<ApiErrorResponse>): NormalizedError {
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