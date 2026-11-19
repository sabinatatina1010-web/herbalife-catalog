import { z } from "zod";

function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, "");
}

function isValidKzPhone(value: string): boolean {
  const digits = normalizePhone(value).replace(/^\+/, "");
  if (/^7\d{10}$/.test(digits)) return true;
  if (/^8\d{10}$/.test(digits)) return true;
  if (/^\d{10}$/.test(digits)) return true;
  return false;
}

export const createOrderSchema = z.object({
  productId: z.string().min(1, "Товар обязателен"),
  customerName: z
    .string()
    .trim()
    .min(2, "Укажите имя")
    .max(100, "Имя слишком длинное"),
  phone: z
    .string()
    .trim()
    .min(10, "Укажите номер телефона")
    .max(20, "Номер телефона слишком длинный")
    .refine(isValidKzPhone, {
      message: "Некорректный номер телефона",
    }),
  quantity: z.coerce.number().int().min(1, "Минимум 1").max(99, "Максимум 99"),
  comment: z
    .string()
    .trim()
    .max(500, "Комментарий слишком длинный")
    .optional()
    .transform((value) => (value ? value : undefined)),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
