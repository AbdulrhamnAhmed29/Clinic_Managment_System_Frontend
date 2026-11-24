
function Pagesheaders({ title , title2 , des}) {
    return (
        <header>
            <h1 className="text-3xl italic font-black text-white sm:text-3xl"> <span className="mb-2 text-3xl font-semibold text-lime-400">{title}</span> {title2}</h1>
            <p className="mt-2 text-sm leading-6 text-white/55">
                {des}
            </p>
        </header>
    )
}

export default Pagesheaders
