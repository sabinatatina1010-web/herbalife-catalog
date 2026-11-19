"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/product";

type CategoryTabsProps = {
  categories: Category[];
  activeCategoryId: string | null;
  onChange: (categoryId: string | null) => void;
};

export function CategoryTabs({
  categories,
  activeCategoryId,
  onChange,
}: CategoryTabsProps) {
  const activeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeCategoryId]);

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max gap-2">
        <button
          type="button"
          ref={activeCategoryId === null ? activeRef : null}
          onClick={() => onChange(null)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition",
            activeCategoryId === null
              ? "bg-brand-900 text-white shadow-sm shadow-brand-900/20"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-800",
          )}
        >
          Все продукты
        </button>
        {categories.map((category) => {
          const isActive = activeCategoryId === category.id;
          return (
            <button
              key={category.id}
              type="button"
              ref={isActive ? activeRef : null}
              onClick={() => onChange(category.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition",
                isActive
                  ? "bg-brand-900 text-white shadow-sm shadow-brand-900/20"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-800",
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
