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
            className="relative w-full overflow-hidden rounded-[1.75rem] border border-lime-300/25 bg-transparent text-white shadow-[0_32px_120px_-38px_rgba(132,204,22,0.35)] backdrop-blur-xl"
        >
            <div className="h-1 bg-gradient-to-l from-lime-300 via-[#7bea00] to-lime-300" />
            <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-lime-400/10 blur-[90px]" />

            <div className="relative p-4 sm:p-10 lg:p-12">
                <header className="mb-5 sm:mb-9">
                    <div className="mb-5 flex items-center justify-between sm:mb-9">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7bea00] text-[#11150c] shadow-[0_0_30px_rgba(123,234,0,0.2)] sm:h-12 sm:w-12">
                                <svg
                                    aria-hidden="true"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >
                                    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                            </span>
                            <div>
                                <p className="text-lg font-black tracking-[0.12em] text-white">
                                    Health Care
                                </p>
                                <p className="text-[0.6rem] font-semibold tracking-[0.12em] text-lime-400/80 sm:text-[0.65rem] sm:tracking-[0.18em]">
                                    HEALTHCARE MANAGEMENT
                                </p>
                            </div>
                        </div>
                        <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/55 sm:flex">
                            <span className="h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_10px_#7bea00]" />
                            دخول آمن
                        </span>
                    </div>

                    <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-lime-400">
                        <span className="h-px w-6 bg-lime-400" />
                        مرحبًا بعودتك
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
                        سجّل دخولك
                    </h2>
                    <p className="mt-2 max-w-lg text-sm leading-6 text-white/55 sm:mt-3 sm:leading-7 sm:text-base">
                        مساحة واحدة لإدارة عملائك ومتابعة أعمالك بكل سهولة.
                    </p>
                </header>

                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    noValidate
                    className="flex flex-col gap-4 sm:gap-6"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-1.5 block text-sm font-semibold text-white/85 sm:mb-2.5"
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
                                className={`h-12 w-full rounded-xl border bg-white/[0.03] pr-12 pl-4 text-left text-base text-white outline-none transition placeholder:text-white/25 focus:ring-4 sm:h-14 ${errors.email
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
                            className="mb-1.5 block text-sm font-semibold text-white/85 sm:mb-2.5"
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
                                className={`h-12 w-full rounded-xl border bg-white/[0.03] pr-12 pl-4 text-base text-white outline-none transition placeholder:text-white/25 focus:ring-4 sm:h-14 ${errors.password
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
                        className="mt-1 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#7bea00] px-5 text-base font-extrabold text-[#11150c] shadow-[0_8px_28px_rgba(123,234,0,0.18)] transition hover:-translate-y-0.5 hover:bg-lime-300 hover:shadow-[0_12px_36px_rgba(123,234,0,0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:mt-2 sm:h-14"
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

                <div className="mt-5 flex items-center gap-4 sm:mt-8">
                    <div className="h-px flex-1 bg-white/10" />
                    <p className="text-xs text-white/40">مساحة عملك تبدأ من هنا</p>
                    <div className="h-px flex-1 bg-white/10" />
                </div>
            </div>
        </div>
    );
}
