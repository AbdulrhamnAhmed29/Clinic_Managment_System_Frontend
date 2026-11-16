function SectionPlaceholder({ title, description }) {
    return (
        <section className="mx-auto max-w-7xl">
            <p className="mb-2 text-sm font-semibold text-lime-400">healthCare</p>
            <h1 className="text-2xl font-black text-white sm:text-3xl">{title}</h1>
            <div className="mt-7 rounded-2xl border border-white/[0.08] bg-[#101310] p-6 sm:p-8">
                <p className="text-sm leading-7 text-white/55">{description}</p>
                <p className="mt-3 text-xs text-white/35">سيتم عرض بيانات هذا القسم هنا.</p>
            </div>
        </section>
    );
}

export default SectionPlaceholder;
