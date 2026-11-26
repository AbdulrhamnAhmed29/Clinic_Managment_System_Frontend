import { useForm, FormProvider } from "react-hook-form"
import { useAddUsers } from "../hooks/useAddUser"
import { createUserSchema } from "../validators/createUserSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { LockKeyhole, Mail, UserRound } from "lucide-react"
import { useUploadImage } from "../hooks/uploadImagesHook"
import { Can } from "../../../shared/authorization/Can"
import { useGetCurrantUser } from "../hooks/useGetCurrantUser.js"
import { IconInput } from "./IconInput.jsx"
import ClinicsDropDownList from "./ClinicsDropDownList.jsx"
import UserImageUpload from "./UserImageUpload.jsx"

function UsersForm() {
    const { createUserAsync, isLoading } = useAddUsers();
    const { CreateImage } = useUploadImage()
    const { user } = useGetCurrantUser()
    const methods = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            clinic: "",
            role: undefined,
        },
        mode: "onBlur",
        resolver: zodResolver(createUserSchema),
    })
    const { register, handleSubmit, formState: { errors } } = methods
    console.log(user);

    const currantRole = user?.user.role;


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
            console.log(data);

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
        <FormProvider {...methods} >
            <form
                onSubmit={handleSubmit(onSubmit)}
                dir="rtl"
                noValidate
                className="w-full    py-2 text-right"
            >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* NAME  */}
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
                    {/* EMAIL  */}
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
                    {/* PASSWORD  */}
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
                    {/* CLINICS & PERMMISIONS  */}
                    <Can role={currantRole} permission={"clinics.read"}>
                        <ClinicsDropDownList />
                    </Can>
                    {/* USER IMAGES  */}
                    <UserImageUpload />
                </div>
                {/* SUBMIT BUTTON  */}
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
        </FormProvider>
    )
}

export default UsersForm