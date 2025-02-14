import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

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
