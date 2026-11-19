import { cn } from "@/lib/utils";
import type { ProductStatus as ProductStatusType } from "@/types/product";

const STATUS_MAP: Record<
  ProductStatusType,
  { label: string; className: string; dotClassName: string }
> = {
  available: {
    label: "В наличии",
    className: "bg-emerald-50 text-emerald-800",
    dotClassName: "bg-emerald-500",
  },
  out_of_stock: {
    label: "Нет в наличии",
    className: "bg-slate-100 text-slate-600",
    dotClassName: "bg-slate-400",
  },
  preorder: {
    label: "Предзаказ",
    className: "bg-orange-50 text-orange-700",
    dotClassName: "bg-orange-500",
  },
};

type ProductStatusProps = {
  status: ProductStatusType;
  className?: string;
};

export function ProductStatus({ status, className }: ProductStatusProps) {
  const config = STATUS_MAP[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        config.className,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dotClassName)} />
      {config.label}
    </span>
  );
}
