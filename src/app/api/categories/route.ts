import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        isActive: true,
        sortOrder: true,
      },
    });

    return NextResponse.json({ data: categories });
  } catch (error) {
    console.error("GET /api/categories", error);
    return NextResponse.json(
      { error: "Не удалось загрузить категории" },
      { status: 500 },
    );
  }
}
