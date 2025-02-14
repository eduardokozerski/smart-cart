"use client";

import { useState, useEffect } from "react";
import Cart from "@/components/Cart";
import CartButton from "@/components/CartButton";
import { ProductRepository } from "@/repositories/ProductRepository";
import { Product } from "@/repositories/ProductRepository";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductRepository.fetchProducts(1);
        setProducts(data.products);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <main className="mt-5 max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">My Store</h1>
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6).fill(null).map((_, index) => (
            <li key={index}>
              <ProductSkeleton />
            </li>
          ))}
        </ul>
      </main>
    );
  }
  if (isError) return <div className="text-center text-red-500">Error loading products.</div>;

  return (
    <main className="mt-5 max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Store</h1>
      <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>

      <CartButton />

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  );
}