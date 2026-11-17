function Bone({ className = "" }) {
    return <span className={`skeleton-bone ${className}`} />;
}

function DashboardSkeleton() {
    return (
        <div
            dir="rtl"
            className="app-shell dashboard-skeleton flex h-svh overflow-hidden font-sans text-white"
            role="status"
            aria-busy="true"
            aria-label="جارٍ تحميل لوحة التحكم"
        >
            <aside className="hidden h-svh w-72 shrink-0 flex-col border-l border-white/10 bg-[#10120f] px-5 py-6 lg:flex">
                <div className="mb-10 flex items-center gap-3 px-2">
                    <Bone className="h-11 w-11 rounded-xl" />
                    <span className="space-y-2">
                        <Bone className="h-4 w-24" />
                        <Bone className="h-2.5 w-28" />
                    </span>
                </div>
                <Bone className="mb-4 mr-3 h-3 w-24" />
                <nav aria-hidden="true" className="space-y-2">
                    {Array.from({ length: 5 }, (_, index) => (
                        <div key={index} className="flex items-center gap-3 rounded-xl px-3 py-3">
                            <Bone className="h-5 w-5 rounded-md" />
                            <Bone className={`h-3 ${index % 2 ? "w-24" : "w-32"}`} />
                        </div>
                    ))}
                </nav>
                <div className="mt-auto space-y-3 rounded-2xl border border-lime-400/15 p-4">
                    <Bone className="h-3 w-36" />
                    <Bone className="h-3 w-full" />
                    <Bone className="h-3 w-3/4" />
                </div>
                <Bone className="mt-5 h-10 w-32" />
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="shrink-0">
                    <div className="flex h-[4.5rem] items-center justify-between border-b border-white/[0.07] bg-[#0c0e0c] px-4 sm:px-7">
                        <div className="flex items-center gap-3">
                            <Bone className="hidden h-10 w-64 rounded-xl sm:block" />
                            <Bone className="h-4 w-36 lg:hidden" />
                            <Bone className="hidden h-4 w-44 lg:block" />
                        </div>
                        <Bone className="h-9 w-9 rounded-full" />
                    </div>
                </header>

                <main className="min-h-0 flex-1 overflow-hidden px-4 py-6 sm:px-7 sm:py-8">
                    <div className="mx-auto max-w-7xl space-y-8">
                        <section className="space-y-3">
                            <Bone className="h-3 w-24" />
                            <Bone className="h-8 w-72 max-w-full" />
                            <Bone className="h-4 w-80 max-w-full" />
                        </section>

                        <section
                            aria-label="ملخص المركز"
                            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                        >
                            {Array.from({ length: 3 }, (_, index) => (
                                <article
                                    key={index}
                                    className="rounded-2xl border border-lime-400/15 bg-[#101310] p-5"
                                >
                                    <div className="flex items-center justify-between">
                                        <Bone className="h-3 w-28" />
                                        <Bone className="h-10 w-10 rounded-xl" />
                                    </div>
                                    <Bone className="mt-5 h-8 w-20" />
                                    <Bone className="mt-2 h-3 w-32" />
                                </article>
                            ))}
                        </section>

                        <section className="flex items-center justify-between gap-5 rounded-2xl border border-lime-400/15 bg-[#101310] p-6 sm:p-8">
                            <div className="w-full max-w-2xl space-y-3">
                                <Bone className="h-5 w-64 max-w-full" />
                                <Bone className="h-3 w-full" />
                                <Bone className="h-3 w-4/5" />
                            </div>
                            <Bone className="hidden h-11 w-11 shrink-0 rounded-full sm:block" />
                        </section>
                    </div>
                </main>
            </div>

            <nav
                aria-hidden="true"
                className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-white/10 bg-[#10120f] px-2 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] lg:hidden"
            >
                {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className="flex min-h-14 flex-col items-center justify-center gap-2">
                        <Bone className="h-5 w-5 rounded-md" />
                        <Bone className="h-2 w-10" />
                    </div>
                ))}
            </nav>
        </div>
    );
}

export default DashboardSkeleton;
