import { useCartStore } from "@/store/cartStore";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, updateQuantity, total, loadCart, clearCart } = useCartStore();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (typeof loadCart === "function") {
      loadCart();
    }
  }, [loadCart]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      closeButtonRef.current?.blur();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
      <div className="w-96 bg-white p-6 shadow-lg h-full relative">
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl"
        >
          ✕
        </button>
        <h1 className="text-black text-2xl font-bold mb-4">Your Cart</h1>

        {cart.length > 0 ? (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="border p-3 rounded flex items-start justify-between">
                  <div className="flex items-center">
                    <Image
                      src={item.image && item.image.trim() !== "" ? item.image : "/default-image.jpg"}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md mr-4"
                    />
                    <div>
                      <h3 className="text-black">{item.name}</h3>
                      <p className="text-black font-bold">${item.price.toFixed(2)}</p>
                      <div className="text-black text-sm flex items-center">
                        Quantity:{" "}
                        <div className="flex items-center border rounded-md px-1 gap-1 ml-2">
                          <button onClick={() => updateQuantity(item.id, "decrease")}>-</button>
                          <span className="px-2 text-xs">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, "increase")}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-xs font-bold"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="text-black mt-4">
              <p>Total: ${total().toFixed(2)}</p>
            </div>
            <div className="flex">
              <button className="mt-2 p-2 flex-grow text-white bg-blue-600 hover:bg-blue-800 rounded-md">
                Proceed to checkout
              </button>
            </div>
            <div className="flex">
              <button
                onClick={clearCart}
                className="mt-2 p-2 flex-grow text-white bg-red-600 hover:bg-red-800 rounded-md"
              >
                Clear Cart
              </button>
            </div>
            
          </>
        ) : (
          <p className="text-center text-gray-500 mt-4">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}