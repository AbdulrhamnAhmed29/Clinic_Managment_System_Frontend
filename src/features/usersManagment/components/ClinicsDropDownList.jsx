import { Hospital } from "lucide-react"
import { useGetTenants } from "../../tenantManagment/hooks/getTenantsHook"
import { IconSelect } from "./IconSelect"
import { useFormContext } from "react-hook-form"


function ClinicsDropDownList() {
    const { clinics } = useGetTenants()
    const { register, formState: { errors } } = useFormContext();
    const roleOptions = [
        { value: "super_admin", label: "مدير المنصة" },
        { value: "clinic_admin", label: "مدير العيادة" },
        { value: "employee", label: "موظف" },
    ]
    return (
        <>
            {/* CLINICS*/}
            <div className="flex flex-col gap-1.5">
                <label
                    htmlFor="clinic"
                    className="text-sm font-medium text-zinc-200"
                >
                    العيادة
                    <span className="mr-1 text-[var(--brand-primary)]" aria-hidden="true">*</span>
                </label>
                <IconSelect
                    icon={Hospital}
                    id="clinic"
                    required
                    aria-invalid={Boolean(errors.clinic)}
                    aria-describedby={errors.clinic ? "clinic-error" : undefined}
                    invalid={Boolean(errors.clinic)}
                    {...register("clinic")}
                >
                    <option value="" disabled className="bg-[#101310] text-white">
                        اختر العيادة
                    </option>
                    {clinics?.data.map((clinic) => (
                        <option
                            key={clinic._id}
                            value={clinic._id}
                            className="bg-[#101310] text-white"
                        >
                            {clinic.name}
                        </option>
                    ))}
                </IconSelect>
                {errors.clinic && (
                    <p id="clinic-error" role="alert" className="text-xs text-red-400">
                        {errors.clinic.message}
                    </p>
                )}
            </div>


            <fieldset className="flex flex-col gap-3 sm:col-span-2">
                <legend className="text-sm font-medium text-zinc-200">
                    الصلاحية
                    <span className="mr-1 text-[var(--brand-primary)]" aria-hidden="true">*</span>
                </legend>
                <div
                    role="radiogroup"
                    aria-label="اختيار صلاحية المستخدم"
                    aria-describedby={errors.role ? "role-error" : undefined}
                    aria-invalid={Boolean(errors.role)}
                    className="grid gap-3 sm:grid-cols-3"
                >
                    {roleOptions.map((role) => (
                        <label
                            key={role.value}
                            className="flex cursor-pointer items-center gap-3 rounded-xl border border-[color-mix(in_srgb,var(--brand-primary)_24%,transparent)] bg-transparent px-4 py-3 text-sm text-white/80 transition hover:border-[color-mix(in_srgb,var(--brand-primary)_55%,transparent)] has-[:checked]:border-[var(--brand-primary)] has-[:checked]:bg-[color-mix(in_srgb,var(--brand-primary)_8%,transparent)]"
                        >
                            <input
                                type="radio"
                                value={role.value}
                                aria-invalid={Boolean(errors.role)}
                                aria-describedby={errors.role ? "role-error" : undefined}
                                className="h-4 w-4 accent-[var(--brand-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
                                {...register("role")}
                            />
                            <span>{role.label}</span>
                        </label>
                    ))}
                </div>
                {errors.role && (
                    <p id="role-error" role="alert" className="text-xs text-red-400">
                        {errors.role.message}
                    </p>
                )}
            </fieldset>
        </>
    )
}

export default ClinicsDropDownList
