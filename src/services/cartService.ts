import { Product } from "@/repositories/ProductRepository";

const API_URL = "/api/cart";

export const fetchCart = async (): Promise<Product[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch cart");
  return response.json();
};

export const addToCart = async (product: Product) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...product, quantity: 1 }),
  });
  if (!response.ok) throw new Error("Failed to add product to cart");
  return response.json();
};

export const removeFromCart = async (productId: number) => {
  const response = await fetch(`${API_URL}/${productId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to remove product from cart");
};

export const updateQuantity = async (productId: number, quantity: number) => {
  const response = await fetch(`${API_URL}/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) throw new Error("Failed to update product quantity");
  return response.json();
};