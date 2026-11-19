"use client";

import { SearchX } from "lucide-react";

type EmptyStateProps = {
  onReset: () => void;
};

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        <SearchX className="h-6 w-6" aria-hidden />
      </div>
      <h2 className="font-display text-2xl font-semibold text-slate-900">
        Ничего не найдено
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        По вашему запросу товары не найдены. Попробуйте изменить поисковый запрос
        или выбрать другую категорию.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-full bg-brand-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-800"
      >
        Сбросить фильтры
      </button>
    </div>
  );
}
