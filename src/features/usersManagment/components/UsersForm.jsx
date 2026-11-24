import { useForm } from "react-hook-form"
import { useAddUsers } from "../hooks/useAddUser"
import { createUserSchema } from "../validators/createUserSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDown, Hospital, LockKeyhole, Mail, Upload, UserRound } from "lucide-react"
import { useUploadImage } from "../hooks/uploadImagesHook"
import { useGetTenants } from "../../tenantManagment/hooks/getTenantsHook"

// Replace these temporary options with clinic IDs from the API.


const roleOptions = [
    { value: "super_admin", label: "مدير المنصة" },
    { value: "clinic_admin", label: "مدير العيادة" },
    { value: "employee", label: "موظف" },
]

const fieldClassNames = (invalid, className = "") => [
    "h-12 w-full rounded-xl border bg-transparent py-2.5 pr-11 pl-4 text-sm text-white",
    invalid
        ? "border-red-400/75"
        : "border-[color-mix(in_srgb,var(--brand-primary)_32%,transparent)]",
    "placeholder:text-white/40",
    "outline-none transition duration-200 hover:border-[color-mix(in_srgb,var(--brand-primary)_58%,transparent)]",
    "focus:border-[var(--brand-primary)] focus:ring-4 focus:ring-[color-mix(in_srgb,var(--brand-primary)_16%,transparent)]",
    className,
].join(" ")

function IconInput({ icon: Icon, className = "", invalid = false, ...props }) {
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

function IconSelect({ icon: Icon, invalid = false, children, ...props }) {
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

function UsersForm() {
    const { createUserAsync, isLoading } = useAddUsers();
    const { CreateImage } = useUploadImage()
    const { clinics } = useGetTenants()
    console.log(clinics);
    console.log("render");


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            clinic: "",
            role: ""
        },
        mode: "onBlur",
        resolver: zodResolver(createUserSchema),
    })

    const selectedImage = watch("image");
    const imagePreview = selectedImage?.[0]
        ? URL.createObjectURL(selectedImage[0])
        : null;
    const onSubmit = async (data) => {
        try {
            let imageUrl = null;

            if (data.image?.[0]) {
                const res = await CreateImage(data.image[0]);
                if (!res?.url) {
                    throw new Error("فشل في الحصول على رابط الصورة");
                }
                imageUrl = res.url;
            }

            const payload = {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
                tenantId: data.clinic,
                image: imageUrl
            };
console.log(payload);

            await createUserAsync(payload);
        } catch (error) {
            console.error("Create user failed:", error);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            dir="rtl"
            noValidate
            className="w-full    py-2 text-right"
        >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* الاسم */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="name"
                        className="text-sm font-medium text-zinc-200"
                    >
                        الاسم الكامل
                    </label>
                    <IconInput
                        icon={UserRound}
                        id="name"
                        type="text"
                        placeholder="مثال: د. أحمد محمود"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        autoComplete="name"
                        invalid={Boolean(errors.name)}
                        {...register("name")}
                    />
                    {errors.name && (
                        <p id="name-error" role="alert" className="text-xs text-red-400">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* البريد الإلكتروني */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-zinc-200"
                    >
                        البريد الإلكتروني
                    </label>
                    <IconInput
                        icon={Mail}
                        id="email"
                        type="email"
                        dir="ltr"
                        placeholder="doctor@clinic.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        autoComplete="email"
                        className="text-left"
                        invalid={Boolean(errors.email)}
                        {...register("email")}
                    />
                    {errors.email && (
                        <p id="email-error" role="alert" className="text-xs text-red-400">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* كلمة المرور */}
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-zinc-200"
                    >
                        كلمة المرور
                    </label>
                    <IconInput
                        icon={LockKeyhole}
                        id="password"
                        type="password"
                        dir="ltr"
                        placeholder="••••••••"
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={errors.password ? "password-error" : undefined}
                        autoComplete="new-password"
                        className="text-left"
                        invalid={Boolean(errors.password)}
                        {...register("password")}
                    />
                    {errors.password && (
                        <p id="password-error" role="alert" className="text-xs text-red-400">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* العيادة */}
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
                        aria-required="true"
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

                {/* صورة المستخدم */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                    <label
                        htmlFor="image"
                        className="text-sm font-medium text-zinc-200"
                    >
                        صورة المستخدم
                    </label>

                    <label
                        htmlFor="image"
                        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-transparent px-4 py-5 text-center transition duration-200 hover:bg-[color-mix(in_srgb,var(--brand-primary)_4%,transparent)] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--brand-primary)] ${errors.image ? "border-red-400/75" : "border-[color-mix(in_srgb,var(--brand-primary)_32%,transparent)] hover:border-[var(--brand-primary)]"
                            }`}
                    >
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="معاينة صورة المستخدم"
                                className="mb-3 h-28 w-40 rounded-xl object-cover"
                            />
                        ) : (
                            <div className="mb-3 flex h-28 w-28 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--brand-primary)_24%,transparent)] bg-transparent text-[var(--brand-primary)]">
                                <Upload size={40} aria-hidden="true" />
                            </div>
                        )}

                        <span className="text-sm font-medium text-[var(--brand-primary)]">
                            {imagePreview ? "تغيير الصورة المختارة" : "اختر صورة للمستخدم"}
                        </span>



                        <input
                            id="image"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="sr-only"
                            {...register("image")}
                        />
                    </label>

                    {errors.image && (
                        <p role="alert" className="text-xs text-red-400">
                            {errors.image.message}
                        </p>
                    )}
                </div>

            </div>

            {/* زر الحفظ */}
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-[color-mix(in_srgb,var(--brand-primary)_20%,transparent)] pt-5">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[var(--brand-primary)] px-6 py-2.5 text-sm font-bold text-zinc-950 transition duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--brand-primary)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isLoading ? "جاري الإضافة..." : "إضافة مستخدم"}
                </button>
            </div>
        </form>
    )
}

export default UsersForm