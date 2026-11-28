import { fieldClassNames } from "./fieldClassNames";

export function IconInput({ icon: Icon, className = "", invalid = false, ...props }) {
    return (
        <div className="group relative">
            <Icon
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--brand-primary)] transition-opacity group-focus-within:opacity-100"
            />
            <input
                {...props}
                className={fieldClassNames(invalid, className)}
            />
        </div>
    )
}