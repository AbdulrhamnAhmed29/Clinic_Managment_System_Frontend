import { Building2, MapPin, Pencil, Phone, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { confirmAction } from "../../../components/ui/confirmAction";
import EmptyState from "../../../components/ui/EmptyState";
import ErrorState from "../../../components/ui/ErrorState";
import LoadingState from "../../../components/ui/LoadingState";
import { useDeleteTenant } from "../hooks/deleteTenant";
import { useGetTenants } from "../hooks/getTenantsHook";

const statusLabels = {
    active: "نشطة",
    suspended: "غير نشطة",
};

function getStatusLabel(status) {
    
    const normalizedStatus = status?.toLowerCase();
    return statusLabels[normalizedStatus] || status?.replace(/_/g, " ") || "غير محددة";
}

function StatusBadge({ status }) {
    const isActive = status?.toLowerCase() === "active";

    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                isActive
                    ? "border-lime-400/20 bg-lime-400/[0.08] text-lime-300"
                    : "border-white/10 bg-white/[0.03] text-white/60"
            }`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-lime-400" : "bg-white/35"}`} aria-hidden="true" />
            {getStatusLabel(status)}
        </span>
    );
}

function ClinicsTable() {
    const { clinicsIsLoading, clinics, isError, error, refetch } = useGetTenants();
    const { deleteTenantAsync, isDeleting } = useDeleteTenant();
    const tenants = Array.isArray(clinics?.data)
        ? clinics.data
        : Array.isArray(clinics)
            ? clinics
            : [];

    const handleDelete = async (tenant) => {
        const result = await confirmAction({
            title: "حذف العيادة؟",
            text: `هل أنت متأكد من حذف ${tenant.name}؟ لا يمكن التراجع عن هذا الإجراء.`,
            confirmText: "حذف العيادة",
            isDestructive: true,
        });
        if (!result.isConfirmed) return;

        try {
            await deleteTenantAsync(tenant._id);
        } catch (deleteError) {
            toast.error(deleteError?.message || "تعذر حذف العيادة");
        }
    };

    if (clinicsIsLoading) {
        return <LoadingState message="جاري تحميل العيادات..." />;
    }

    if (isError) {
        return (
            <ErrorState
                title="تعذر تحميل العيادات"
                message={error?.message || "حاول مرة أخرى بعد قليل."}
                onRetry={refetch}
            />
        );
    }

    if (tenants.length === 0) {
        return (
            <EmptyState
                icon={Building2}
                title="لا توجد عيادات للعرض"
                description="ستظهر بيانات العيادات هنا عند إضافتها."
            />
        );
    }

    return (
        <section
            aria-labelledby="clinics-table-heading"
            className="glass-surface overflow-hidden rounded-2xl border border-white/10"
        >
            <header className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
                <div>
                    <h2 id="clinics-table-heading" className="font-bold text-white">
                        قائمة العيادات
                    </h2>
                    <p className="mt-1 text-sm text-white/50">
                        بيانات العيادات المسجلة في النظام
                    </p>
                </div>
                <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/60">
                    {tenants.length} عيادة
                </span>
            </header>

            <div className="hidden overflow-x-auto sm:block">
                <table className="w-full min-w-[680px] border-separate border-spacing-0 text-right">
                    <thead className="bg-white/[0.035] text-[13px] font-bold text-white/60">
                        <tr>
                            <th scope="col" className="border-b border-white/10 px-6 py-4">اسم العيادة</th>
                            <th scope="col" className="border-b border-white/10 px-6 py-4">العنوان</th>
                            <th scope="col" className="border-b border-white/10 px-6 py-4">رقم الهاتف</th>
                            <th scope="col" className="border-b border-white/10 px-6 py-4">الحالة</th>
                            <th scope="col" className="border-b border-white/10 px-6 py-4">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenants.map((tenant) => (
                            <tr
                                key={tenant._id}
                                className="transition-colors hover:bg-lime-400/[0.035] [&:last-child>td]:border-b-0"
                            >
                                <td className="border-b border-white/[0.06] px-6 py-4 text-sm font-semibold text-white">
                                    {tenant.name || "غير محدد"}
                                </td>
                                <td className="max-w-[360px] truncate border-b border-white/[0.06] px-6 py-4 text-sm text-white/65">
                                    {tenant.address || "غير محدد"}
                                </td>
                                <td className="border-b border-white/[0.06] px-6 py-4 text-left text-sm text-white/65" dir="ltr">
                                    {tenant.phone || "غير محدد"}
                                </td>
                                <td className="border-b border-white/[0.06] px-6 py-4">
                                    <StatusBadge status={tenant.status} />
                                </td>
                                <td className="border-b border-white/[0.06] px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            to={`/dashboard/clinics/${tenant._id}/edit`}
                                            aria-label={`تعديل ${tenant.name}`}
                                            title="تعديل العيادة"
                                            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-lime-400/15 bg-lime-400/[0.04] px-3 text-xs font-semibold text-lime-200/80 transition hover:border-lime-400/30 hover:bg-lime-400/[0.08] hover:text-lime-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                                        >
                                            <Pencil size={16} aria-hidden="true" />
                                            تعديل
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(tenant)}
                                            disabled={isDeleting}
                                            aria-label={`حذف ${tenant.name}`}
                                            title="حذف العيادة"
                                            className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-red-400/15 bg-red-400/[0.035] px-3 text-xs font-semibold text-red-200/75 transition hover:border-red-400/30 hover:bg-red-400/[0.08] hover:text-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <Trash2 size={16} aria-hidden="true" />
                                            حذف
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ul className="space-y-3 p-3 sm:hidden">
                {tenants.map((tenant) => (
                    <li
                        key={tenant._id}
                        className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <Building2 size={18} className="shrink-0 text-lime-300" aria-hidden="true" />
                                <p className="truncate text-sm font-bold text-white">
                                    {tenant.name || "غير محدد"}
                                </p>
                            </div>
                            <StatusBadge status={tenant.status} />
                        </div>
                        <div className="mt-4 space-y-3 border-t border-white/[0.06] pt-3">
                            <div className="flex items-start gap-2.5 text-sm text-white/65">
                                <MapPin size={16} className="mt-0.5 shrink-0 text-white/40" aria-hidden="true" />
                                <span className="break-words">{tenant.address || "غير محدد"}</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-sm text-white/65">
                                <Phone size={15} className="shrink-0 text-white/40" aria-hidden="true" />
                                <span dir="ltr">{tenant.phone || "غير محدد"}</span>
                            </div>
                            <div className="flex items-center gap-2 border-t border-white/[0.06] pt-3">
                                <Link
                                    to={`/dashboard/clinics/${tenant._id}/edit`}
                                    aria-label={`تعديل ${tenant.name}`}
                                    className="inline-flex min-h-9 flex-1 items-center justify-center gap-2 rounded-xl border border-lime-400/15 bg-lime-400/[0.04] text-xs font-semibold text-lime-200/80 transition hover:bg-lime-400/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                                >
                                    <Pencil size={14} aria-hidden="true" />
                                    تعديل
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(tenant)}
                                    disabled={isDeleting}
                                    aria-label={`حذف ${tenant.name}`}
                                    className="inline-flex min-h-9 flex-1 items-center justify-center gap-2 rounded-xl border border-red-400/15 bg-red-400/[0.035] text-xs font-semibold text-red-200/75 transition hover:bg-red-400/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Trash2 size={14} aria-hidden="true" />
                                    حذف
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ClinicsTable
