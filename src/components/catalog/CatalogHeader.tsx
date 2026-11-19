import { Leaf } from "lucide-react";

export function CatalogHeader() {
  return (
    <header className="border-b border-brand-100/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-900 text-white shadow-sm shadow-brand-900/20">
            <Leaf className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <p className="font-display text-lg font-semibold tracking-[0.08em] text-brand-900 uppercase">
              Herbalife
            </p>
            <p className="text-xs text-slate-500">Каталог продукции</p>
          </div>
        </div>
        <p className="hidden text-sm text-slate-500 sm:block">
          Быстрый заказ через WhatsApp
        </p>
      </div>
    </header>
  );
}
