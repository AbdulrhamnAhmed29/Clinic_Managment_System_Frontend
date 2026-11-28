import { z } from "zod";

export const tenantSchema = z.object({
    name: z.string().trim().min(2, "اسم العيادة يجب أن يكون حرفين على الأقل"),
    address: z.string().trim().min(3, "عنوان العيادة مطلوب"),
    phone: z
        .string()
        .trim()
        .min(7, "رقم الهاتف غير مكتمل")
        .max(20, "رقم الهاتف طويل جدًا")
        .regex(/^[+0-9()\-\s]+$/, "صيغة رقم الهاتف غير صحيحة"),
    status: z.enum(["active", "suspended"]),
});
