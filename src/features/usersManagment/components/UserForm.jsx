import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, LockKeyhole, Mail, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Can } from "../../../shared/authorization/Can";
import ErrorState from "../../../components/ui/ErrorState";
import LoadingState from "../../../components/ui/LoadingState";
import { useGetCurrantUser } from "../hooks/useGetCurrantUser.js";
import { useGetOneUser } from "../hooks/useGetOneUser";
import { useAddUsers } from "../hooks/useAddUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useUploadImage } from "../hooks/uploadImagesHook";
import { createUserSchema } from "../validators/createUserSchema";
import { editUserSchema } from "../validators/editUserSchema.js";
import ClinicsDropDownList from "./ClinicsDropDownList.jsx";
import { IconInput } from "./IconInput.jsx";
import UserImageUpload from "./UserImageUpload.jsx";

function UserForm({ mode = "create" }) {
    const isEdit = mode === "edit";
    const { id } = useParams();
    const navigate = useNavigate();
    const { user: userResponse, isLoading: isUserLoading, isError, error } = useGetOneUser(isEdit ? id : undefined);
    const { user: currentUser } = useGetCurrantUser();
    const { createUserAsync, isLoading: isCreating } = useAddUsers();
    const { updateUserAsync, isUpdating } = useUpdateUser();
    const { CreateImage, imageIsLoading } = useUploadImage();
    const user = userResponse?.user ?? userResponse;
    const methods = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            clinic: "",
            role: "",
            image: undefined,
        },
        mode: "onBlur",
        resolver: zodResolver(isEdit ? editUserSchema : createUserSchema),
    });
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = methods;
    const isSaving = isSubmitting || isCreating || isUpdating || imageIsLoading;

    useEffect(() => {
        if (!isEdit || !user) return;

        reset({
            name: user.name || "",
            email: user.email || "",
            password: "",
            clinic: user.tenantId?._id || user.tenantId || "",
            role: user.role || "",
            image: undefined,
        });
    }, [isEdit, user, reset]);

    const handleBack = () => navigate("/dashboard/users");

    const onSubmit = async (data) => {
        try {
            let imageUrl;
            if (data.image?.[0]) {
                const uploadResult = await CreateImage(data.image[0]);
                if (!uploadResult?.url) {
                    throw new Error("فشل في الحصول على رابط الصورة");
                }
                imageUrl = uploadResult.url;
            }

            if (isEdit) {
                await updateUserAsync({
                    id,
                    data: {
                        name: data.name,
                        email: data.email,
                        role: data.role,
                        ...(data.clinic ? { tenantId: data.clinic } : {}),
                        ...(imageUrl ? { image: imageUrl } : {}),
                    },
                });
                toast.success("تم تحديث بيانات المستخدم بنجاح");
                handleBack();
                return;
            }

            await createUserAsync({
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
                tenantId: data.clinic,
                image: imageUrl || null,
            });
        } catch (submitError) {
            toast.error(submitError?.message || "تعذر حفظ بيانات المستخدم");
        }
    };

    const backButton = (
        <button
            type="button"
            onClick={handleBack}
            className="mb-4 inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-3.5 text-sm font-semibold text-white/65 transition hover:border-lime-400/25 hover:bg-white/[0.05] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
        >
            <ArrowRight size={17} aria-hidden="true" />
            العودة إلى المستخدمين
        </button>
    );

    if (isEdit && isUserLoading) {
        return <div>{backButton}<LoadingState message="جاري تحميل بيانات المستخدم..." /></div>;
    }

    if (isEdit && (isError || !user)) {
        return (
            <div>
                {backButton}
                <ErrorState
                    title="تعذر تحميل بيانات المستخدم"
                    message={error?.message || "لم يتم العثور على المستخدم المطلوب."}
                />
            </div>
        );
    }

    return (
        <div>
            {backButton}
            <section className="glass-surface mx-auto max-w-4xl rounded-2xl border border-white/10 p-4 sm:rounded-3xl sm:p-6 lg:p-8">
                <div className="mb-6 border-b border-white/[0.08] pb-5">
                    <h2 className="text-lg font-bold text-white sm:text-xl">
                        {isEdit ? "بيانات المستخدم" : "بيانات المستخدم الجديد"}
                    </h2>
                    <p className="mt-1.5 text-sm leading-6 text-white/50">
                        {isEdit
                            ? "حدّث المعلومات والصلاحيات أو اختر صورة جديدة للحساب."
                            : "أدخل المعلومات الأساسية وحدد الصلاحية والصورة الشخصية."}
                    </p>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} dir="rtl" noValidate className="text-right">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="text-sm font-semibold text-white/85">
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
                                {errors.name && <p id="name-error" role="alert" className="text-xs text-red-400">{errors.name.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="text-sm font-semibold text-white/85">
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
                                {errors.email && <p id="email-error" role="alert" className="text-xs text-red-400">{errors.email.message}</p>}
                            </div>

                            {!isEdit && (
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="password" className="text-sm font-semibold text-white/85">
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
                                    {errors.password && <p id="password-error" role="alert" className="text-xs text-red-400">{errors.password.message}</p>}
                                </div>
                            )}

                            <Can role={currentUser?.user?.role} permission="clinics.read">
                                <ClinicsDropDownList />
                            </Can>
                            <UserImageUpload imageUrl={user?.image} userName={user?.name} />
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
                                        : "إضافة المستخدم"}
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </section>
        </div>
    );
}

export default UserForm;
