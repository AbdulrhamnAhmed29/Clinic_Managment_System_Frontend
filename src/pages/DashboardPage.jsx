import { CalendarDays, Clock3, UsersRound } from "lucide-react";

const summaryCards = [
    { title: "إجمالي الحجوزات", icon: CalendarDays },
    { title: "العيادات", icon: UsersRound },
    { title: "المواعيد القادمة", icon: Clock3 },
];

function DashboardPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-8">
            <header>
                <p className="mb-2 text-sm font-semibold text-lime-400">لوحة التحكم</p>
                <h1 className="text-2xl font-black leading-relaxed text-white sm:text-3xl">
                    إدارة <span className="gradient-word">رعايتك</span> في مكان واحد
                </h1>
                <p className="mt-2 text-sm leading-6 text-white/55">
                    نظرة عامة على الحجوزات والعيادات والمواعيد.
                </p>
            </header>

            <section aria-label="ملخص النظام" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {summaryCards.map(({ title, icon: Icon }) => (
                    <article
                        key={title}
                        className="dashboard-stat-card glass-surface rounded-2xl border p-5"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-white/60">{title}</p>
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/10 text-lime-300">
                                <Icon size={19} aria-hidden="true" />
                            </span>
                        </div>
                        <p className="mt-5 text-3xl font-black text-white">—</p>
                        <p className="mt-2 text-xs text-white/45">ستظهر البيانات عند توفرها.</p>
                    </article>
                ))}
            </section>
        </div>
    );
}

export default DashboardPage;
