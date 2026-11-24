
const variants = {
    primary:
        "border-transparent bg-[var(--brand-primary)] text-[#11150c] shadow-[0_8px_28px_rgba(123,234,0,0.18)] hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(123,234,0,0.28)]",
    secondary:
        "border-white/10 bg-white/[0.03] text-white/75 hover:border-white/20 hover:bg-white/[0.06] hover:text-white",
    danger:
        "border-red-400/20 bg-red-400/10 text-red-300 hover:border-red-400/40 hover:bg-red-400/15",
    ghost:
        "border-transparent bg-transparent text-white/60 hover:bg-white/[0.05] hover:text-white",
};

const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-5 text-base",
};

function Button({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    icon: Icon,
    iconPosition = "start",
    loading = false,
    fullWidth = false,
    disabled = false,
    className = "",
    ...props
}) {
    const variantClasses = variants[variant] ?? variants.primary;
    const sizeClasses = sizes[size] ?? sizes.md;

    return (
        <button
            type={type}
            disabled={disabled || loading}
            aria-busy={loading || undefined}
            className={[
                "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border font-extrabold transition",
                "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--brand-primary)]",
                "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0",
                fullWidth ? "w-full" : "",
                sizeClasses,
                variantClasses,
                className,
            ].filter(Boolean).join(" ").trim()}
            {...props}
        >
            {loading && (
                <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                />
            )}
            {!loading && Icon && iconPosition === "start" && (
                <Icon aria-hidden="true" size={18} />
            )}
            {children && <span>{children}</span>}
            {!loading && Icon && iconPosition === "end" && (
                <Icon aria-hidden="true" size={18} />
            )}
        </button>
    );
}

export default Button;
