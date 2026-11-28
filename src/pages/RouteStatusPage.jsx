import { ArrowRight, Compass, Home, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const statusContent = {
    403: {
        title: "غير مصرح لك بالدخول",
        description: "حسابك لا يملك الصلاحية اللازمة لعرض هذه الصفحة.",
        actionLabel: "العودة إلى لوحة التحكم",
        Icon: ShieldAlert,
    },
    404: {
        title: "الصفحة غير موجودة",
        description: "لم نتمكن من العثور على الصفحة المطلوبة. ربما تغير الرابط أو كُتب بشكل غير صحيح.",
        actionLabel: "العودة إلى الرئيسية",
        Icon: Compass,
    },
};

function RouteStatusPage({ code = 404 }) {
    const content = statusContent[code] || statusContent[404];
    const { Icon } = content;

    return (
        <main
            dir="rtl"
            className="app-shell flex min-h-svh items-center justify-center px-4 py-10 text-white"
        >
            <section
                aria-labelledby="route-status-title"
                className="glass-surface w-full max-w-xl rounded-3xl border border-white/10 px-6 py-10 text-center shadow-2xl sm:px-10 sm:py-12"
            >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-lime-400/20 bg-lime-400/[0.08] text-lime-300 shadow-[0_0_30px_color-mix(in_srgb,var(--brand-primary)_12%,transparent)]">
                    <Icon size={30} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <p className="mt-6 text-6xl font-black tracking-tight text-lime-300 sm:text-7xl">
                    {code}
                </p>
                <h1 id="route-status-title" className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
                    {content.title}
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-white/55 sm:text-base">
                    {content.description}
                </p>
                <Link
                    to="/dashboard"
                    className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-5 text-sm font-bold text-zinc-950 shadow-[0_8px_24px_color-mix(in_srgb,var(--brand-primary)_16%,transparent)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-lime-400"
                >
                    <Home size={17} aria-hidden="true" />
                    {content.actionLabel}
                    <ArrowRight size={16} aria-hidden="true" />
                </Link>
            </section>
        </main>
    );
}

export default RouteStatusPage;
