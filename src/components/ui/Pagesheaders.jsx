
import { LayoutDashboard } from "lucide-react";

function Pagesheaders({ title, title2, des, icon: Icon = LayoutDashboard }) {
    return (
        <div className="flex min-w-0 items-start gap-3 sm:gap-4" dir="rtl">
            <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-lime-400/20 bg-lime-400/[0.08] text-lime-300 shadow-[0_0_24px_rgba(123,234,0,0.08)] sm:h-12 sm:w-12">
                <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div className="min-w-0">
                <h1 className="flex flex-wrap items-baseline gap-x-2 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
                    <span className="text-lime-300">{title}</span>
                    <span>{title2}</span>
                </h1>
                {des && (
                    <p className="mt-1.5 max-w-2xl text-sm leading-6 text-white/55 sm:mt-2 sm:text-[15px]">
                        {des}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Pagesheaders
