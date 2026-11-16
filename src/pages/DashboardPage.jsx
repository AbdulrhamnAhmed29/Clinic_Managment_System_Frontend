import { ArrowUpLeft, CalendarDays, Clock3, UsersRound } from "lucide-react";

const stats = [
    { label: "إجمالي العملاء", value: "—", detail: "ملف عميل مسجل", icon: UsersRound },
    { label: "مواعيد اليوم", value: "—", detail: "موعد يحتاج متابعة", icon: CalendarDays },
    { label: "المواعيد القادمة", value: "—", detail: "خلال الأيام القادمة", icon: Clock3 },
];

function DashboardPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-8">
            <section>
                <p className="mb-2 text-sm font-semibold text-lime-400">لوحة التحكم</p>
                <h1 className="text-2xl font-black leading-relaxed text-white sm:text-3xl">
                    رعاية <span className="gradient-word">أفضل</span> تبدأ بإدارة منظمة
                </h1>
                <p className="mt-2 text-sm leading-6 text-white/50 sm:text-base">
                    نظرة سريعة على مركزك، عملائك، ومواعيدك.
                </p>
            </section>

            <section aria-label="ملخص المركز" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map(({ label, value, detail, icon: Icon }) => (
                    <article
                        key={label}
                        className="rounded-2xl border border-white/[0.08] bg-[#101310] p-5 transition hover:border-lime-400/20"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-white/55">{label}</p>
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/10 text-lime-300">
                                <Icon size={19} aria-hidden="true" />
                            </span>
                        </div>
                        <p className="mt-5 text-3xl font-black text-white">{value}</p>
                        <p className="mt-2 text-xs text-white/40">{detail}</p>
                    </article>
                ))}
            </section>

            <section className="rounded-2xl border border-lime-400/15 bg-gradient-to-l from-lime-400/[0.08] via-[#101310] to-[#101310] p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-lg font-bold text-white">
                            كل تفاصيل مركزك في <span className="gradient-word">مكان واحد</span>
                        </p>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
                            استخدم القائمة للتنقل بين العملاء والمواعيد والخدمات، وتابع تحديثات مركزك بسهولة.
                        </p>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime-400 text-[#11150c]">
                        <ArrowUpLeft size={20} aria-hidden="true" />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default DashboardPage;
