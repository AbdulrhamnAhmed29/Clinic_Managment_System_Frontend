import { Hospital } from "lucide-react";

function LoginPageHeader() {
    return (
        <>
            <div dir="ltr" className="bg-[var(--brand-primary)] px-4 py-1.5 text-center text-[0.7rem] font-extrabold tracking-wide text-[#11150c] sm:py-2 sm:text-1xl">
                Clinics System — رعاية أفضل، وإدارة أذكى
            </div>
            <div dir="ltr" className="border-b border-white/10 bg-[#111311]">
                <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-5 sm:h-[3.5rem] sm:px-8">
                    <a href="/" className="flex items-center gap-3" aria-label="Clinics System الرئيسية">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--brand-primary)_12%,transparent)] text-[var(--brand-primary)] sm:h-9 sm:w-9">
                            <Hospital aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                        <span className="font-black tracking-[0.08em] text-white sm:tracking-[0.14em]">Clinics System</span>
                    </a>
                    <div className="flex items-center gap-2 text-xs text-white/55 sm:text-sm">
                        <svg
                            aria-hidden="true"
                            className="h-4 w-4 text-[var(--brand-primary)]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                        >
                            <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                        <span>بوابة دخول آمنة</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPageHeader;
