"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { ProductStatus } from "@/components/catalog/ProductStatus";
import { formatPrice } from "@/lib/utils";
import type { ProductWithCategory } from "@/types/product";

type ProductCardProps = {
  product: ProductWithCategory;
  onOpen: (product: ProductWithCategory) => void;
};

export function ProductCard({ product, onOpen }: ProductCardProps) {
  const showRating =
    typeof product.rating === "number" &&
    product.rating > 0 &&
    typeof product.ratingCount === "number";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_10px_30px_rgba(27,67,50,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(27,67,50,0.12)]">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative block aspect-square overflow-hidden bg-[#f7fcf9] text-left"
        aria-label={`Открыть ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
          className="object-contain p-2 transition duration-500 group-hover:scale-[1.03]"
        />
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium tracking-wide text-brand-600 uppercase">
              {product.category.name}
            </p>
            <button
              type="button"
              onClick={() => onOpen(product)}
              className="mt-1 line-clamp-2 min-h-14 w-full text-left font-display text-lg leading-7 font-semibold text-slate-900 transition hover:text-brand-800"
            >
              {product.name}
            </button>
          </div>
          <ProductStatus status={product.status} className="shrink-0" />
        </div>

        <p className="line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">
          {product.description}
        </p>

        <div
          className="mt-3 flex h-5 items-center gap-1.5 text-sm text-slate-600"
          aria-hidden={!showRating}
        >
          {showRating ? (
            <>
              <Star
                className="h-4 w-4 fill-amber-400 text-amber-400"
                aria-hidden
              />
              <span className="font-medium">{product.rating!.toFixed(1)}</span>
              <span className="text-slate-400">({product.ratingCount})</span>
            </>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <p className="font-display text-xl font-semibold text-brand-900">
            {formatPrice(product.price)} ₸
          </p>
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="rounded-full bg-brand-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-800"
          >
            Подробнее
          </button>
        </div>
      </div>
    </article>
  );
}
