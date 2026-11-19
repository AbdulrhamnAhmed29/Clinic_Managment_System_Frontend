import { RefreshCw } from "lucide-react";

function ErrorState({
    title = "تعذر تحميل البيانات",
    message = "حاول مرة أخرى بعد قليل.",
    onRetry,
}) {
    return (
        <section
            role="alert"
            className="glass-surface flex flex-col items-center rounded-2xl border border-white/10 px-5 py-12 text-center"
        >
            <p className="font-semibold text-white">{title}</p>
            <p className="mt-2 max-w-md text-sm text-white/55">{message}</p>
            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-lime-400/40 hover:text-lime-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                >
                    <RefreshCw size={15} aria-hidden="true" />
                    إعادة المحاولة
                </button>
            )}
        </section>
    );
}

export default ErrorState;
