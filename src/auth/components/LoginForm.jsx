import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validators/loginSchemaValidate";
import { useLogin } from "../authHooks/loginHook";

export default function HealthCareLoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { login, isPending } = useLogin()

    const handleFormSubmit = (data) => login(data)

    return (
        <div
            dir="rtl"
            className=" relative w-full overflow-hidden    bg-transparent text-white "
        >
            <div className="relative px-2 py-20  sm:p-6 lg:p-7">
                <header className="mb-3 sm:mb-9">
                    <div className="text-center">
                        <h2 className="text-3xl  font-black sm:mb-8 text-white sm:text-2xl">
                            سجّل دخولك
                        </h2>
                        <div dir="ltr" className="mb-1 text-3xl inline-flex items-center gap-2 text-2xl font-bold uppercase tracking-[0.16em] text-lime-400">
                            مرحبًا بعودتك
                        </div>


                        <p className="mt-1 max-w-lg text-xs leading-5 text-white/55 sm:mt-2 sm:text-sm sm:leading-6">
                            مساحة واحدة لإدارة عملائك ومتابعة أعمالك بكل سهولة.
                        </p>
                    </div>
                </header>
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    noValidate
                    className="login-form-fields mx-auto flex  flex-col gap-3 sm:w-full sm:gap-8"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1 block text-xs font-semibold text-white/85 sm:mb-2 sm:text-sm"
                        >
                            البريد الإلكتروني
                        </label>
                        <div className="group relative">
                            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/35 transition-colors group-focus-within:text-lime-400">
                                <svg
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                >
                                    <rect x="3" y="5" width="18" height="14" rx="2" />
                                    <path d="m3 7 9 6 9-6" />
                                </svg>
                            </span>
                            <input
                                type="email"
                                id="email"
                                autoComplete="email"
                                dir="ltr"
                                placeholder="name@example.com"
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? "email-error" : undefined}
                                {...register("email")}
                                className={`login-field h-11 w-full rounded-xl border bg-white/[0.03] pr-12 pl-4 text-left text-sm text-white outline-none transition placeholder:text-white/25 focus:ring-4 sm:h-12 ${errors.email
                                    ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/10"
                                    : "border-white/10 hover:border-white/20 focus:border-lime-400/70 focus:ring-lime-400/10"
                                    }`}
                            />
                        </div>
                        {errors.email && (
                            <p
                                id="email-error"
                                role="alert"
                                className="mt-2 text-sm text-red-300"
                            >
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-1 block text-xs font-semibold text-white/85 sm:mb-2 sm:text-sm"
                        >
                            كلمة المرور
                        </label>
                        <div className="group relative">
                            <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/35 transition-colors group-focus-within:text-lime-400">
                                <svg
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                >
                                    <rect x="4" y="10" width="16" height="11" rx="2" />
                                    <path d="M8 10V7a4 4 0 118 0v3" />
                                </svg>
                            </span>
                            <input
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                placeholder="أدخل كلمة المرور"
                                aria-invalid={Boolean(errors.password)}
                                aria-describedby={errors.password ? "password-error" : undefined}
                                {...register("password")}
                                className={`login-field h-11 w-full rounded-xl border bg-white/[0.03] pr-12 pl-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:ring-4 sm:h-12 ${errors.password
                                    ? "border-red-400/70 focus:border-red-400 focus:ring-red-400/10"
                                    : "border-white/10 hover:border-white/20 focus:border-lime-400/70 focus:ring-lime-400/10"
                                    }`}
                            />
                        </div>
                        {errors.password && (
                            <p
                                id="password-error"
                                role="alert"
                                className="mt-2 text-sm text-red-300"
                            >
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="login-submit mt-1 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-5 text-sm font-extrabold text-[#11150c] shadow-[0_8px_28px_rgba(123,234,0,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(123,234,0,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:mt-1 sm:h-12 sm:text-base"
                    >
                        <span>{isPending ? "جارٍ التحقق..." : "تسجيل الدخول"}</span>
                        {!isPending && (
                            <svg
                                aria-hidden="true"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M19 12H5m0 0 7 7m-7-7 7-7" />
                            </svg>
                        )}
                    </button>
                </form>

            </div>

            <div className="login-footer-row mx-auto mt-10 flex w-[90%] items-center gap-3 sm:mt-10 sm:w-full sm:gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <p className="text-xs text-white/40">مساحة عملك تبدأ من هنا</p>
                <div className="h-px flex-1 bg-white/10" />
            </div>
        </div>
    );
}
