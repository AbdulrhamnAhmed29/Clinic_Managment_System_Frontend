import { Hospital, Search } from "lucide-react";

function Headers() {
    return (
        <header className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#0c0e0c] px-4 sm:px-7">
            <div className="flex items-center gap-3">
                <div className="hidden h-10 w-64 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 sm:flex">
                    <Search size={17} className="text-white/35" aria-hidden="true" />
                    <input
                        type="search"
                        aria-label="ابحث في النظام"
                        placeholder="ابحث عن عميل أو موعد..."
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                    />
                </div>
                <div className="flex items-center gap-2 lg:hidden">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--brand-primary)_12%,transparent)] text-[var(--brand-primary)]">
                        <Hospital size={20} aria-hidden="true" />
                    </span>
                    <span className="font-bold text-white">Clinics System</span>
                </div>
                <p className="hidden text-sm text-white/50 lg:block">
                    مرحبًا بك في <span className="gradient-word font-bold">Clinics System</span>
                </p>
            </div>
            <div className="flex items-center gap-3">            
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-lime-400/25 bg-lime-400/10 text-sm font-bold text-lime-300">
                    د
                </div>
            </div>
        </header>
    )
}

export default Headers
