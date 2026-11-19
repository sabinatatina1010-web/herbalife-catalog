"use client";

import { useEffect, useMemo, useState } from "react";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { CategoryTabs } from "@/components/catalog/CategoryTabs";
import { EmptyState } from "@/components/catalog/EmptyState";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { ProductModal } from "@/components/catalog/ProductModal";
import { SearchBar } from "@/components/catalog/SearchBar";
import { useDebounce } from "@/hooks/useDebounce";
import { normalizeSearch } from "@/lib/utils";
import type { Category, ProductWithCategory } from "@/types/product";

export function CatalogPage() {
  const [products, setProducts] = useState<ProductWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    let cancelled = false;

    async function loadCatalog() {
      setIsLoading(true);
      setError(null);

      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);

        const productsPayload = (await productsResponse.json()) as {
          data?: ProductWithCategory[];
          error?: string;
        };
        const categoriesPayload = (await categoriesResponse.json()) as {
          data?: Category[];
          error?: string;
        };

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error(
            productsPayload.error ||
              categoriesPayload.error ||
              "Не удалось загрузить каталог",
          );
        }

        if (!cancelled) {
          setProducts(productsPayload.data ?? []);
          setCategories(categoriesPayload.data ?? []);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Не удалось загрузить каталог",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadCatalog();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    // Apply empty search immediately on clear/reset; debounce only while typing.
    const query = normalizeSearch(search.trim() === "" ? "" : debouncedSearch);

    return products.filter((product) => {
      const matchesCategory =
        activeCategoryId === null || product.categoryId === activeCategoryId;

      if (!matchesCategory) {
        return false;
      }

      if (!query) {
        return true;
      }

      const haystack = normalizeSearch(
        [
          product.name,
          product.description,
          product.fullDescription ?? "",
          product.category.name,
        ].join(" "),
      );

      return haystack.includes(query);
    });
  }, [products, activeCategoryId, debouncedSearch, search]);

  function handleOpenProduct(product: ProductWithCategory) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleResetFilters() {
    setSearch("");
    setActiveCategoryId(null);
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f3faf6_0%,#ffffff_28%,#ffffff_100%)]">
      <CatalogHeader />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <section className="max-w-2xl">
          <p className="text-sm font-medium tracking-[0.18em] text-brand-700 uppercase">
            Питание для активного дня
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Каталог продукции
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Выбирайте продукты для сбалансированного питания и оформляйте быстрый
            заказ в один клик.
          </p>
        </section>

        <section className="mt-8 space-y-5">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryTabs
            categories={categories}
            activeCategoryId={activeCategoryId}
            onChange={setActiveCategoryId}
          />
          <p className="text-sm text-slate-500">
            Найдено товаров:{" "}
            <span className="font-semibold text-slate-800">
              {isLoading ? "…" : filteredProducts.length}
            </span>
          </p>
        </section>

        <section className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-80 animate-pulse rounded-3xl bg-white/80 shadow-sm"
                />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-red-100 bg-red-50 px-6 py-10 text-center text-red-700">
              {error}
            </div>
          ) : filteredProducts.length === 0 ? (
            <EmptyState onReset={handleResetFilters} />
          ) : (
            <ProductGrid
              products={filteredProducts}
              onOpen={handleOpenProduct}
            />
          )}
        </section>
      </main>

      {selectedProduct ? (
        <ProductModal
          key={selectedProduct.id}
          product={selectedProduct}
          open={isModalOpen}
          onClose={handleCloseModal}
        />
      ) : null}
    </div>
  );
}
