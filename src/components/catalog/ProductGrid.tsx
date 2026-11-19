"use client";

import { ProductCard } from "@/components/catalog/ProductCard";
import type { ProductWithCategory } from "@/types/product";

type ProductGridProps = {
  products: ProductWithCategory[];
  onOpen: (product: ProductWithCategory) => void;
};

export function ProductGrid({ products, onOpen }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onOpen={onOpen} />
      ))}
    </div>
  );
}
