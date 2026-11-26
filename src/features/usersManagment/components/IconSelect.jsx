import { ChevronDown } from "lucide-react"
import { fieldClassNames } from "./fieldClassNames"

export function IconSelect({ icon: Icon, invalid = false, children, ...props }) {
  
    return (
        <div className="group relative">
            <Icon
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--brand-primary)]"
            />
            <ChevronDown
                size={16}
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/55"
            />
            <select
                {...props}
                className={`${fieldClassNames(invalid, "appearance-none pl-10")} cursor-pointer`}
            >
                {children}
            </select>
        </div>
    )
}
