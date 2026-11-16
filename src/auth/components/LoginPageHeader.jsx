function LoginPageHeader() {
    return (
        <>
            <div className="bg-[#7bea00] px-4 py-1.5 text-center text-[0.7rem] font-extrabold tracking-wide text-[#11150c] sm:py-2 sm:text-sm">
                Health Care — رعاية أفضل، وإدارة أذكى
            </div>
            <div className="border-b border-white/10 bg-[#111311]">
                <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
                    <a href="/" className="flex items-center gap-3" aria-label="healthCare الرئيسية">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7bea00] text-[#11150c] sm:h-9 sm:w-9">
                            <svg
                                aria-hidden="true"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                        </span>
                        <span className="font-black tracking-[0.08em] text-white sm:tracking-[0.14em]">Health Care</span>
                    </a>
                    <div className="flex items-center gap-2 text-xs text-white/55 sm:text-sm">
                        <svg
                            aria-hidden="true"
                            className="h-4 w-4 text-lime-400"
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
