import { ImagePlus, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

function UserImageUpload({ imageUrl, userName }) {
    const { register, watch, formState: { errors } } = useFormContext();
    const selectedImage = watch("image");
    const selectedFile = selectedImage?.[0];
    const [localPreview, setLocalPreview] = useState(null);

    useEffect(() => {
        if (!selectedFile) {
            setLocalPreview(null);
            return undefined;
        }

        const previewUrl = URL.createObjectURL(selectedFile);
        setLocalPreview(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    }, [selectedFile]);

    const imagePreview = localPreview || imageUrl;

    return (
        <div className="flex flex-col gap-3 sm:col-span-2">
            <label htmlFor="image" className="text-sm font-semibold text-white/85">
                صورة المستخدم
            </label>
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 sm:flex-row sm:p-5">
                {imagePreview ? (
                    <img
                        src={imagePreview}
                        alt={userName ? `صورة ${userName}` : "معاينة صورة المستخدم"}
                        className="h-24 w-24 shrink-0 rounded-2xl border border-white/10 object-cover shadow-lg"
                    />
                ) : (
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-dashed border-lime-400/25 bg-lime-400/[0.04] text-lime-300">
                        <ImagePlus size={30} aria-hidden="true" />
                    </div>
                )}
                <div className="flex min-w-0 flex-col items-center gap-2 text-center sm:items-start sm:text-right">
                    <p className="text-sm font-semibold text-white">
                        {selectedFile ? "الصورة الجديدة جاهزة" : imageUrl ? "الصورة الحالية" : "أضف صورة شخصية"}
                    </p>
                    <p className="text-xs leading-5 text-white/50">
                        صورة JPG أو PNG أو WEBP، بحد أقصى 5 ميجابايت.
                    </p>
                    <label
                        htmlFor="image"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-lime-400/20 bg-lime-400/[0.06] px-3.5 py-2 text-xs font-semibold text-lime-200 transition hover:border-lime-400/40 hover:bg-lime-400/[0.1] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-lime-400"
                    >
                        <Upload size={15} aria-hidden="true" />
                        {imagePreview ? "تغيير الصورة" : "اختيار صورة"}
                        <input
                            id="image"
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="sr-only"
                            aria-describedby={errors.image ? "image-error" : undefined}
                            {...register("image")}
                        />
                    </label>
                </div>
            </div>
            {errors.image && (
                <p id="image-error" role="alert" className="text-xs text-red-400">
                    {errors.image.message}
                </p>
            )}
        </div>
    );
}

export default UserImageUpload
