function LoadingState({ message = "جارٍ تحميل البيانات..." }) {
    return (
        <section
            role="status"
            aria-live="polite"
            aria-busy="true"
            className="glass-surface overflow-hidden rounded-2xl border border-white/10"
        >
            <div className="border-b border-white/10 px-4 py-4 sm:px-6">
                <p className="font-bold text-white">{message}</p>
            </div>
            <div className="space-y-4 p-4 sm:p-6">
                {Array.from({ length: 3 }, (_, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between gap-4"
                    >
                        <div className="h-10 w-48 animate-pulse rounded-lg bg-white/[0.06]" />
                        <div className="h-7 w-28 animate-pulse rounded-full bg-white/[0.06]" />
                        <div className="h-7 w-24 animate-pulse rounded-full bg-white/[0.06]" />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default LoadingState;
