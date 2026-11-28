import z from "zod";
import { userImageSchema } from "./createUserSchema.js";

export const editUserSchema = z.object({
    name: z.string().trim().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
    email: z.string().trim().email("صيغة البريد الإلكتروني غير صحيحة"),
    clinic: z.string().optional(),
    role: z.string().optional(),
    image: userImageSchema,
});