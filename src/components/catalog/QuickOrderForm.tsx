"use client";

import { FormEvent, useState } from "react";
import type { ProductWithCategory } from "@/types/product";

type QuickOrderFormProps = {
  product: ProductWithCategory;
  onCancel: () => void;
  onSuccess: () => void;
};

type FormErrors = {
  customerName?: string;
  phone?: string;
  quantity?: string;
  form?: string;
};

export function QuickOrderForm({
  product,
  onCancel,
  onSuccess,
}: QuickOrderFormProps) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          customerName,
          phone,
          quantity,
          comment: comment.trim() || undefined,
        }),
      });

      const payload = (await response.json()) as {
        error?: string;
        details?: Partial<Record<keyof FormErrors, string[]>>;
        whatsappUrl?: string;
      };

      if (!response.ok) {
        setErrors({
          customerName: payload.details?.customerName?.[0],
          phone: payload.details?.phone?.[0],
          quantity: payload.details?.quantity?.[0],
          form: payload.error ?? "Не удалось отправить заявку",
        });
        return;
      }

      if (!payload.whatsappUrl) {
        setErrors({
          form: "Заявка не сформирована. Попробуйте ещё раз.",
        });
        return;
      }

      const whatsappUrl = payload.whatsappUrl;
      const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (!popup) {
        // Popup blocked — open WhatsApp in the same tab as a reliable fallback.
        window.location.assign(whatsappUrl);
        return;
      }
      onSuccess();
    } catch {
      setErrors({ form: "Ошибка сети. Проверьте подключение и попробуйте снова." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Товар
        </label>
        <input
          value={product.name}
          readOnly
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
        />
      </div>

      <div>
        <label
          htmlFor="customerName"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Имя *
        </label>
        <input
          id="customerName"
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
          required
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          placeholder="Как к вам обращаться"
        />
        {errors.customerName ? (
          <p className="mt-1 text-xs text-red-600">{errors.customerName}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Телефон *
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          placeholder="+7 700 123 45 67"
        />
        {errors.phone ? (
          <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="quantity"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Количество
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={99}
          value={quantity}
          onChange={(event) => setQuantity(Number(event.target.value))}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
        />
        {errors.quantity ? (
          <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="comment"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Комментарий
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          rows={3}
          className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          placeholder="Пожелания к заказу"
        />
      </div>

      {errors.form ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {errors.form}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-full border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Отмена
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-full bg-brand-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Отправка…" : "Отправить заявку"}
        </button>
      </div>
    </form>
  );
}
