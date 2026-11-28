import { Hospital, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ClinicsTable from "../components/ClinicsTable";
import Pagesheaders from "../../../components/ui/Pagesheaders";

function TenantsPage() {
    return (
        <div className="mx-auto max-w-7xl space-y-7">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <Pagesheaders
                    title="إدارة"
                    title2="العيادات"
                    des="إدارة بيانات العيادات والمراكز الطبية ومتابعة تفاصيلها."
                    icon={Hospital}
                />
                <Link
                    to="/dashboard/clinics/add"
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-4 text-sm font-bold text-zinc-950 shadow-[0_8px_24px_color-mix(in_srgb,var(--brand-primary)_16%,transparent)] transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-lime-400"
                >
                    <Plus size={18} aria-hidden="true" />
                    إضافة عيادة
                </Link>
            </header>
            <main>
                <ClinicsTable />
            </main>
        </div>
    )
}

export default TenantsPage
