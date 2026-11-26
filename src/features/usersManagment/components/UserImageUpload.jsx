import { Upload } from "lucide-react";
import { useFormContext } from "react-hook-form";

function UserImageUpload() {
    const { register, watch, formState: { errors } } = useFormContext()
    const selectedImage = watch("image");
    const imagePreview = selectedImage?.[0]
        ? URL.createObjectURL(selectedImage[0])
        : null;
    return (
        <>
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
        </>
    )
}

export default UserImageUpload
