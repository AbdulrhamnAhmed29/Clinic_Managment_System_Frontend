
function Cards({ content: summaryCards }) {
    return (
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
    )
}

export default Cards
