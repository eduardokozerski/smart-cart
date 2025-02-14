import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const perPage = parseInt(url.searchParams.get("perPage") || "6", 10);

    const skip = (page - 1) * perPage;
    const totalProducts = await prisma.product.count();
    const products = await prisma.product.findMany({
      skip,
      take: perPage,
    });

    const totalPages = Math.ceil(totalProducts / perPage);

    return NextResponse.json({
      products,
      totalPages,
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}