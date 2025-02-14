"use client";

import { useEffect, useState } from "react";
import { ProductRepository, Product } from "@/repositories/ProductRepository";

export function useProducts(page = 1) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    ProductRepository.fetchProducts(page)
      .then((data) => {
        setProducts(data.products);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [page]);

  return { products, isLoading, isError };
}