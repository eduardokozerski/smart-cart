"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Cart from "./Cart";

export default function CartButton() {
  const { cart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <button
        onClick={(event) => {
          setIsOpen(true);
          event.currentTarget.blur();
        }}
        className="fixed top-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center"
      >
        <ShoppingCartIcon className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="ml-2 bg-red-500 text-xs px-2 py-1 rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      <Cart isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}