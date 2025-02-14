import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Importa a instância global do Prisma

export async function POST(req: Request) {
  try {
    const { productId, quantity } = await req.json();

    if (!productId || !quantity) {
      return NextResponse.json(
        { error: "Lacking productId or quantity" },
        { status: 400 }
      );
    }

    const cartItem = await prisma.cart.create({
      data: {
        productId: productId,
        quantity: quantity,
      },
    });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (error) {
    console.error("Error adding product to cart.", error);
    return NextResponse.json(
      { error: "Error adding product to cart." },
      { status: 500 }
    );
  }
}
