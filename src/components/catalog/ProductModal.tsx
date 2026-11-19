"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2, Star, X } from "lucide-react";
import { ProductStatus } from "@/components/catalog/ProductStatus";
import { QuickOrderForm } from "@/components/catalog/QuickOrderForm";
import { formatPrice } from "@/lib/utils";
import type { ProductWithCategory } from "@/types/product";

type ProductModalProps = {
  product: ProductWithCategory | null;
  open: boolean;
  onClose: () => void;
};

export function ProductModal({ product, open, onClose }: ProductModalProps) {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !product) {
    return null;
  }

  const showRating =
    typeof product.rating === "number" &&
    product.rating > 0 &&
    typeof product.ratingCount === "number";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm transition hover:bg-white hover:text-slate-900"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative min-h-72 bg-[#f7fcf9] md:min-h-full">
            <div className="relative mx-auto aspect-square w-full max-w-md md:max-w-none md:h-full md:min-h-[420px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 90vw, 420px"
                priority
              />
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <ProductStatus status={product.status} />
              <span className="text-xs font-medium tracking-wide text-brand-600 uppercase">
                {product.category.name}
              </span>
            </div>

            <h2
              id="product-modal-title"
              className="mt-3 font-display text-3xl font-semibold text-slate-900"
            >
              {product.name}
            </h2>

            <p className="mt-3 font-display text-2xl font-semibold text-brand-900">
              {formatPrice(product.price)} ₸
            </p>

            {showRating ? (
              <div className="mt-3 flex items-center gap-1.5 text-sm text-slate-600">
                <Star
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                  aria-hidden
                />
                <span className="font-medium">{product.rating!.toFixed(1)}</span>
                <span className="text-slate-400">({product.ratingCount})</span>
              </div>
            ) : null}

            {orderSuccess ? (
              <div className="mt-8 rounded-3xl bg-emerald-50 px-5 py-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                <p className="mt-3 font-display text-xl font-semibold text-emerald-900">
                  Заявка отправлена
                </p>
                <p className="mt-2 text-sm text-emerald-800">
                  Мы открыли WhatsApp с вашей заявкой. Менеджер свяжется с вами
                  в ближайшее время.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-5 rounded-full bg-brand-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-800"
                >
                  Закрыть
                </button>
              </div>
            ) : showOrderForm ? (
              <div className="mt-6">
                <h3 className="mb-4 font-display text-xl font-semibold text-slate-900">
                  Быстрый заказ
                </h3>
                <QuickOrderForm
                  product={product}
                  onCancel={() => setShowOrderForm(false)}
                  onSuccess={() => setOrderSuccess(true)}
                />
              </div>
            ) : (
              <>
                <div className="mt-6 space-y-5">
                  <section>
                    <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
                      Описание
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {product.fullDescription || product.description}
                    </p>
                  </section>

                  {product.composition ? (
                    <section>
                      <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
                        Состав
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {product.composition}
                      </p>
                    </section>
                  ) : null}

                  {product.preparation ? (
                    <section>
                      <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
                        Способ приготовления
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {product.preparation}
                      </p>
                    </section>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => setShowOrderForm(true)}
                  disabled={product.status === "out_of_stock"}
                  className="mt-8 w-full rounded-full bg-brand-900 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {product.status === "out_of_stock"
                    ? "Нет в наличии"
                    : "Быстрый заказ"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
