import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { Product } from "@/repositories/ProductRepository";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();

  return (
    <div className="flex flex-col justify-between h-full border p-4 rounded-lg shadow-md">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-52 object-cover mb-4 rounded-md"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="flex-grow text-gray-500">{product.description}</p>
      <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
      <button
        className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md"
        onClick={() => addToCart({ ...product, quantity: 1 })}
      >
        Add to cart
      </button>
    </div>
  );
}