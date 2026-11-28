import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export const userImageSchema = z
    .any()
    .optional()
    .refine((files) => {
        if (!files || files.length === 0) return true
        return files instanceof FileList || Array.isArray(files)
    }, "ملف غير صالح")
    .refine((files) => {
        if (!files || files.length === 0) return true
        return ACCEPTED_IMAGE_TYPES.includes(files[0]?.type)
    }, "يرجى اختيار صورة بصيغة JPG, PNG أو WEBP")
    .refine((files) => {
        if (!files || files.length === 0) return true
        return files[0]?.size <= MAX_FILE_SIZE
    }, "حجم الصورة يجب ألا يتجاوز 5MB")

export const createUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "الاسم مطلوب")
        .min(2, "الاسم يجب أن يكون حرفين على الأقل"),

    email: z
        .string()
        .trim()
        .min(1, "البريد الإلكتروني مطلوب")
        .email("صيغة البريد الإلكتروني غير صحيحة"),

    password: z
        .string()
        .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
        .regex(/[0-9]/, "يجب أن تحتوي على رقم واحد على الأقل")
    ,
    clinic: z.string().optional(),
    role: z
        .string()
        .optional(),
    image: userImageSchema,
});