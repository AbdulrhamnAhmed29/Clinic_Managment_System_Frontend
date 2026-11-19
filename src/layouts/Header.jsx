
function Headers() {
    return (
        <header dir="ltr" className="flex  h-[4.5rem] shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#0c0e0c] px-4 sm:px-7">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-lime-400/25 bg-lime-400/10 text-sm font-bold text-lime-300">
                        A
                    </div>
                </div>

                <p className="hidden text-sm text-white/50 lg:block">
                    Abdulrhman<span className="gradient-word font-bold"> Ahmed</span>
                </p>
            </div>
         
        </header>
    )
}

export default Headers
