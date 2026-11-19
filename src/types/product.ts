export type ProductStatus = "available" | "out_of_stock" | "preorder";
export type OrderStatus = "new" | "processing" | "completed";

export interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  image: string;
  price: number;
  description: string;
  fullDescription?: string | null;
  composition?: string | null;
  preparation?: string | null;
  status: ProductStatus;
  rating?: number | null;
  ratingCount?: number | null;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  category?: Category;
}

export interface OrderRequest {
  id: string;
  productId: string;
  customerName: string;
  phone: string;
  quantity: number;
  comment?: string | null;
  status: OrderStatus;
  createdAt: string | Date;
}

export interface ProductWithCategory extends Product {
  category: Category;
}

export interface CreateOrderPayload {
  productId: string;
  customerName: string;
  phone: string;
  quantity: number;
  comment?: string;
}
