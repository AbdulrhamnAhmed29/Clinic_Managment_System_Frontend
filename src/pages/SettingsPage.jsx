import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useBrandColors } from "../theme/useBrandColors";

const colorOptions = [
    { key: "primary", label: "اللون الرئيسي" },
    { key: "secondary", label: "اللون الثانوي" },
];

function SettingsPage() {
    const { colors, updateColor, resetColors } = useBrandColors();
    const [error, setError] = useState("");

    function handleColorChange(key, value) {
        try {
            updateColor(key, value);
            setError("");
        } catch (saveError) {
            console.error("Could not save brand color.", saveError);
            setError("تعذر حفظ اللون. تحقق من إعدادات التخزين وحاول مرة أخرى.");
        }
    }

    function handleReset() {
        try {
            resetColors();
            setError("");
        } catch (resetError) {
            console.error("Could not restore default brand colors.", resetError);
            setError("تعذر استعادة الألوان الافتراضية.");
        }
    }

    return (
        <div className="mx-auto max-w-4xl space-y-7">
            <header>
                <p className="mb-2 text-sm font-semibold text-lime-400">التخصيص</p>
                <h1 className="text-2xl font-black text-white sm:text-3xl">إعدادات الألوان</h1>
                <p className="mt-2 text-sm leading-6 text-white/55">
                    اختر ألوانك المفضلة؛ ستُحفظ تلقائيًا على هذا الجهاز.
                </p>
            </header>

            <section className="glass-surface rounded-2xl border p-5 sm:p-7">
                <div className="grid gap-4 sm:grid-cols-2">
                    {colorOptions.map(({ key, label }) => (
                        <label
                            key={key}
                            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                        >
                            <span>
                                <span className="block font-bold text-white">{label}</span>
                                <span className="mt-2 block font-mono text-xs text-white/50">{colors[key]}</span>
                            </span>
                            <input
                                type="color"
                                value={colors[key]}
                                aria-label={label}
                                onChange={(event) => handleColorChange(key, event.target.value)}
                                className="h-11 w-11 cursor-pointer rounded-lg border border-white/15 bg-transparent p-1"
                            />
                        </label>
                    ))}
                </div>
                <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-lg font-bold text-white">
                        رعاية <span className="gradient-word">أفضل</span> بهويتك
                    </p>
                    <div className="mt-3 flex gap-2" aria-label="معاينة الألوان">
                        <span className="h-2 flex-1 rounded-full" style={{ backgroundColor: colors.primary }} />
                        <span className="h-2 flex-1 rounded-full" style={{ backgroundColor: colors.secondary }} />
                    </div>
                </div>
                {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
                <button
                    type="button"
                    onClick={handleReset}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                >
                    <RotateCcw size={16} aria-hidden="true" />
                    استعادة ألوان healthCare
                </button>
            </section>
        </div>
    );
}

export default SettingsPage;
