import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Building2, MapPin, Phone } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ErrorState from "../../../components/ui/ErrorState";
import LoadingState from "../../../components/ui/LoadingState";
import { IconInput } from "../../usersManagment/components/IconInput.jsx";
import { IconSelect } from "../../usersManagment/components/IconSelect.jsx";
import { useAddTenant } from "../hooks/addTenant";
import { useGetTenantById } from "../hooks/getTenantById";
import { useUpdateTenant } from "../hooks/updateTenant";
import { tenantSchema } from "../validators/tenantSchema";

function TenantForm({ mode = "create" }) {
    const isEdit = mode === "edit";
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        tenant: tenantResponse,
        isLoading: isTenantLoading,
        isError,
        error,
        refetch,
    } = useGetTenantById(isEdit ? id : undefined);
    const { addTenantAsync, isAdding } = useAddTenant();
    const { updateTenantAsync, isUpdating } = useUpdateTenant();
    const tenant = tenantResponse?.data?.data
        ?? tenantResponse?.data
        ?? tenantResponse?.tenant
        ?? tenantResponse;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: "",
            address: "",
            phone: "",
            status: "active",
        },
        resolver: zodResolver(tenantSchema),
        mode: "onBlur",
    });
    const isSaving = isSubmitting || isAdding || isUpdating;

    useEffect(() => {
        if (!isEdit || !tenant) return;

        reset({
            name: tenant.name || "",
            address: tenant.address || "",
            phone: tenant.phone || "",
            status: tenant.status || "active",
        });
    }, [isEdit, tenant, reset]);

    const handleBack = () => navigate("/dashboard/clinics");

    const onSubmit = async (data) => {
        console.log(data)
        try {
            if (isEdit) {
                await updateTenantAsync({ id, data });
            } else {
                await addTenantAsync(data);
            }
            handleBack();
        } catch (submitError) {
            toast.error(submitError?.message || "تعذر حفظ بيانات العيادة");
        }
    };

    const backButton = (
        <button
            type="button"
            onClick={handleBack}
            className="mb-4 inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3.5 text-sm font-semibold text-white/65 transition hover:border-lime-400/25 hover:bg-white/[0.05] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
        >
            <ArrowRight size={17} aria-hidden="true" />
            العودة إلى العيادات
        </button>
    );

    if (isEdit && isTenantLoading) {
        return <div>{backButton}<LoadingState message="جاري تحميل بيانات العيادة..." /></div>;
    }

    if (isEdit && (isError || !tenant)) {
        return (
            <div>
                {backButton}
                <ErrorState
                    title="تعذر تحميل بيانات العيادة"
                    message={error?.message || "لم يتم العثور على العيادة المطلوبة."}
                    onRetry={refetch}
                />
            </div>
        );
    }

    return (
        <div>
            {backButton}
            <section className="glass-surface mx-auto max-w-3xl rounded-2xl border border-white/10 p-4 sm:rounded-3xl sm:p-6 lg:p-8">
                <div className="mb-6 border-b border-white/[0.08] pb-5">
                    <h2 className="text-lg font-bold text-white sm:text-xl">
                        {isEdit ? "بيانات العيادة" : "بيانات العيادة الجديدة"}
                    </h2>
                    <p className="mt-1.5 text-sm leading-6 text-white/50">
                        أدخل اسم العيادة وعنوانها ورقم التواصل وحدد حالتها.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} dir="rtl" noValidate className="text-right">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="tenant-name" className="text-sm font-semibold text-white/85">
                                اسم العيادة
                            </label>
                            <IconInput
                                icon={Building2}
                                id="tenant-name"
                                type="text"
                                autoComplete="organization"
                                placeholder="مثال: عيادة النور"
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={errors.name ? "tenant-name-error" : undefined}
                                invalid={Boolean(errors.name)}
                                {...register("name")}
                            />
                            {errors.name && <p id="tenant-name-error" role="alert" className="text-xs text-red-400">{errors.name.message}</p>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="tenant-phone" className="text-sm font-semibold text-white/85">
                                رقم الهاتف
                            </label>
                            <IconInput
                                icon={Phone}
                                id="tenant-phone"
                                type="tel"
                                dir="ltr"
                                autoComplete="tel"
                                placeholder="01012345678"
                                aria-invalid={Boolean(errors.phone)}
                                aria-describedby={errors.phone ? "tenant-phone-error" : undefined}
                                className="text-left"
                                invalid={Boolean(errors.phone)}
                                {...register("phone")}
                            />
                            {errors.phone && <p id="tenant-phone-error" role="alert" className="text-xs text-red-400">{errors.phone.message}</p>}
                        </div>

                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label htmlFor="tenant-address" className="text-sm font-semibold text-white/85">
                                العنوان
                            </label>
                            <IconInput
                                icon={MapPin}
                                id="tenant-address"
                                type="text"
                                autoComplete="street-address"
                                placeholder="الشارع، المنطقة، المدينة"
                                aria-invalid={Boolean(errors.address)}
                                aria-describedby={errors.address ? "tenant-address-error" : undefined}
                                invalid={Boolean(errors.address)}
                                {...register("address")}
                            />
                            {errors.address && <p id="tenant-address-error" role="alert" className="text-xs text-red-400">{errors.address.message}</p>}
                        </div>

                        <div className="flex flex-col gap-1.5 sm:col-span-2">
                            <label htmlFor="tenant-status" className="text-sm font-semibold text-white/85">
                                الحالة
                            </label>
                            <IconSelect
                                icon={Building2}
                                id="tenant-status"
                                aria-invalid={Boolean(errors.status)}
                                invalid={Boolean(errors.status)}
                                {...register("status")}
                            >
                                <option value="active" className="bg-[#101310] text-white">نشطة</option>
                                <option value="suspended" className="bg-[#101310] text-white">غير نشطة</option>
                            </IconSelect>
                            {errors.status && <p role="alert" className="text-xs text-red-400">{errors.status.message}</p>}
                        </div>
                    </div>

                    <div className="mt-7 flex flex-col-reverse gap-3 border-t border-white/[0.08] pt-5 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="min-h-11 rounded-xl border border-white/10 px-5 text-sm font-semibold text-white/70 transition hover:border-white/20 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
                        >
                            إلغاء
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="min-h-11 rounded-xl bg-[var(--brand-primary)] px-6 text-sm font-bold text-zinc-950 shadow-[0_8px_24px_color-mix(in_srgb,var(--brand-primary)_16%,transparent)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSaving
                                ? "جاري الحفظ..."
                                : isEdit
                                    ? "حفظ التعديلات"
                                    : "إضافة العيادة"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default TenantForm;
