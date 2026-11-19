import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { existsSync } from "node:fs";
import { join } from "node:path";

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: {
      name: true,
      slug: true,
      isActive: true,
      status: true,
      image: true,
    },
    orderBy: { name: "asc" },
  });
  const categories = await prisma.category.count({ where: { isActive: true } });
  const orders = await prisma.orderRequest.count();

  let missingImages = 0;
  for (const product of products) {
    const relative = product.image.replace(/^\//, "");
    const ok = existsSync(join(process.cwd(), "public", relative));
    if (!ok) missingImages += 1;
    console.log(
      `${product.isActive ? "ON " : "OFF"} ${product.status.padEnd(12)} ${product.slug} ${ok ? "IMG_OK" : "IMG_MISS"}`,
    );
  }

  console.log("---");
  console.log(`categories_active=${categories}`);
  console.log(`products_total=${products.length}`);
  console.log(`products_active=${products.filter((p) => p.isActive).length}`);
  console.log(`orders=${orders}`);
  console.log(`missing_images=${missingImages}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
