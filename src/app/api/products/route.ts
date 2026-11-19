import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ name: "asc" }],
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            isActive: true,
            sortOrder: true,
          },
        },
      },
    });

    return NextResponse.json({ data: products });
  } catch (error) {
    console.error("GET /api/products", error);
    return NextResponse.json(
      { error: "Не удалось загрузить товары" },
      { status: 500 },
    );
  }
}
