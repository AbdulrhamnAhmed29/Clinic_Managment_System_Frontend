 import "./ProgressState.css";

function ProgressState({ message = "جارٍ تحميل التطبيق..." }) {
    return (
        <main
            dir="rtl"
            role="status"
            aria-live="polite"
            aria-busy="true"
            className="app-shell flex min-h-svh items-center justify-center px-4 text-white"
        >
            <section className="glass-surface w-full max-w-sm rounded-2xl border border-white/10 p-6 text-center shadow-2xl">
                <div
                    role="progressbar"
                    aria-label={message}
                    aria-valuetext="جارٍ التحميل"
                    className="ui-progress-track"
                >
                    <span className="ui-progress-indicator" />
                </div>
                <p className="mt-5 text-sm font-semibold text-white/85">{message}</p>
            </section>
        </main>
    );
}

export default ProgressState;
