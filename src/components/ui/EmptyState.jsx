import { Inbox } from "lucide-react";

function EmptyState({
    icon: Icon = Inbox,
    title = "لا توجد بيانات",
    description = "ستظهر البيانات هنا عند توفرها.",
}) {
    return (
        <section className="glass-surface flex flex-col items-center rounded-2xl border border-white/10 px-5 py-14 text-center">
            <Icon size={24} className="text-white/35" aria-hidden="true" />
            <p className="mt-3 font-semibold text-white">{title}</p>
            <p className="mt-1 text-sm text-white/50">{description}</p>
        </section>
    );
}

export default EmptyState;
