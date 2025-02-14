import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, action: "increase" | "decrease") => void;
  total: () => number;
  loadCart: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cart.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        });
      },
      removeFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id, action) => {
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: action === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },
      total: () => {
        return get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      loadCart: () => {
        const storedCart = localStorage.getItem("cart-storage");
        if (storedCart) {
          try {
            const parsedCart = JSON.parse(storedCart).state.cart as CartItem[];
            set({ cart: parsedCart || [] });
          } catch (error) {
            console.error("Failed to load cart:", error);
          }
        }
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);