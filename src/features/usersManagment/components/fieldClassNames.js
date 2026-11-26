 export const fieldClassNames = (invalid, className = "") => [
        "h-12 w-full rounded-xl border bg-transparent py-2.5 pr-11 pl-4 text-sm text-white",
        invalid
            ? "border-red-400/75"
            : "border-[color-mix(in_srgb,var(--brand-primary)_32%,transparent)]",
        "placeholder:text-white/40",
        "outline-none transition duration-200 hover:border-[color-mix(in_srgb,var(--brand-primary)_58%,transparent)]",
        "focus:border-[var(--brand-primary)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--brand-primary)_16%,transparent)]",
        className,
    ].join(" ")