import "dotenv/config";
import { PrismaClient, ProductStatus } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Протеиновые коктейли",
    slug: "protein-shakes",
    sortOrder: 1,
  },
  {
    name: "Травяные напитки",
    slug: "herbal-tea",
    sortOrder: 2,
  },
  {
    name: "Белковые продукты",
    slug: "protein-products",
    sortOrder: 3,
  },
  {
    name: "Алоэ",
    slug: "aloe",
    sortOrder: 4,
  },
  {
    name: "Дополнительное питание",
    slug: "nutrition",
    sortOrder: 5,
  },
] as const;

type SeedProduct = {
  name: string;
  slug: string;
  categorySlug: (typeof categories)[number]["slug"];
  image: string;
  price: number;
  description: string;
  fullDescription: string;
  composition: string;
  preparation: string;
  status: ProductStatus;
  rating?: number;
  ratingCount?: number;
};

const products: SeedProduct[] = [
  {
    name: "Formula 1 — Cookie Crunch",
    slug: "formula-1-cookie-crunch",
    categorySlug: "protein-shakes",
    image: "/products/formula-1-cookie-crunch.jpg",
    price: 15000,
    description: "Протеиновый коктейль Формула 1 со вкусом хрустящего печенья",
    fullDescription:
      "Полноценный приём пищи в стакане: Formula 1 со вкусом Cookie Crunch. Сбалансированный протеиновый коктейль для завтрака или перекуса.",
    composition:
      "Соевый белок, клетчатка, витамины и минералы, ароматизатор хрустящего печенья.",
    preparation:
      "Смешайте 2 мерные ложки с 250 мл воды или обезжиренного молока. Взбивайте 30 секунд.",
    status: "available",
    rating: 4.8,
    ratingCount: 126,
  },
  {
    name: "Formula 1 — Нежный шоколад",
    slug: "formula-1-chocolate",
    categorySlug: "protein-shakes",
    image: "/products/formula-1-chocolate.jpg",
    price: 15000,
    description: "Протеиновый коктейль Формула 1 со вкусом нежного шоколада",
    fullDescription:
      "Классический шоколадный вкус Formula 1. Удобный способ получить белки, клетчатку и комплекс микронутриентов в одном напитке. Товар года 2023.",
    composition:
      "Соевый белок, какао, фруктоза, клетчатка, витаминно-минеральный комплекс.",
    preparation:
      "Добавьте 2 мерные ложки в шейкер с 250 мл жидкости и взбейте до однородности.",
    status: "available",
    rating: 4.9,
    ratingCount: 184,
  },
  {
    name: "Formula 1 — Банан в карамели",
    slug: "formula-1-banana-caramel",
    categorySlug: "protein-shakes",
    image: "/products/formula-1-banana-caramel.jpg",
    price: 15000,
    description: "Протеиновый коктейль Формула 1 со вкусом банана в карамели",
    fullDescription:
      "Протеиновый коктейль Formula 1 стал ещё лучше! Нежный вкус банана в карамели для полноценного и вкусного приёма пищи.",
    composition:
      "Соевый белок, клетчатка, витамины и минералы, ароматизатор банана и карамели.",
    preparation:
      "Смешайте 2 мерные ложки с 250 мл воды или молока. Можно добавить лёд.",
    status: "available",
    rating: 4.7,
    ratingCount: 112,
  },
  {
    name: "Formula 1 — Вечерний коктейль",
    slug: "formula-1-evening",
    categorySlug: "protein-shakes",
    image: "/products/formula-1-evening.jpg",
    price: 16000,
    description: "Ужин, который вам нужен — лидер продаж",
    fullDescription:
      "Формула 1 Вечерний коктейль — питательный сбалансированный протеиновый коктейль для ужина. Специальный состав для комфортного вечера и полноценного отдыха.",
    composition:
      "Протеиновая смесь, клетчатка, витамины и минералы, специальный компонент для вечернего рациона.",
    preparation:
      "Смешайте порцию с 250 мл воды или молока вечером вместо ужина или как лёгкий приём пищи.",
    status: "available",
    rating: 4.9,
    ratingCount: 203,
  },
  {
    name: "Formula 1 — Клубника",
    slug: "formula-1-strawberry",
    categorySlug: "protein-shakes",
    image: "/products/formula-1-strawberry.jpg",
    price: 15000,
    description: "Протеиновый коктейль Формула 1 со вкусом клубники",
    fullDescription:
      "Почувствуйте вкус летней клубники в стакане за 2 минуты с протеиновым коктейлем Formula 1 со вкусом клубники.",
    composition:
      "Соевый белок, натуральный ароматизатор клубники, клетчатка, витамины.",
    preparation:
      "Смешайте с водой, молоком или растительным напитком. Можно добавить лёд.",
    status: "available",
    rating: 4.6,
    ratingCount: 73,
  },
  {
    name: "Травяной напиток — Лимон",
    slug: "herbal-tea-lemon",
    categorySlug: "herbal-tea",
    image: "/products/herbal-tea-lemon.jpg",
    price: 12500,
    description: "Травяной напиток со вкусом лимона (51 г)",
    fullDescription:
      "Польза фитокомпонентов для поддержания тонуса в течение дня! Концентрат травяного напитка Herbalife со вкусом лимона.",
    composition:
      "Сухой концентрат для приготовления напитка. Масса нетто: 51 г.",
    preparation:
      "Разведите порцию концентрата в 250 мл горячей или холодной воды.",
    status: "available",
    rating: 4.5,
    ratingCount: 98,
  },
  {
    name: "Травяной напиток — Малина",
    slug: "herbal-tea-raspberry",
    categorySlug: "herbal-tea",
    image: "/products/herbal-tea-raspberry.jpg",
    price: 12500,
    description: "Травяной напиток со вкусом малины (51 г)",
    fullDescription:
      "Польза фитокомпонентов для поддержания тонуса в течение дня! Концентрат травяного напитка Herbalife со вкусом малины.",
    composition:
      "Сухой концентрат для приготовления напитка. Масса нетто: 51 г.",
    preparation:
      "Разведите порцию концентрата в 250 мл горячей или холодной воды.",
    status: "available",
    rating: 4.6,
    ratingCount: 87,
  },
  {
    name: "Formula 3 — Белковый продукт",
    slug: "formula-3-protein",
    categorySlug: "protein-products",
    image: "/products/formula-3-protein.jpg",
    price: 18000,
    description: "Низкокалорийный источник полноценного белка",
    fullDescription:
      "Формула 3 — специализированный белковый продукт. Низкокалорийный источник полноценного белка, который можно добавлять в коктейль Formula 1 или использовать отдельно.",
    composition: "Изолят соевого белка, витамины. Масса нетто: 240 г.",
    preparation:
      "Добавьте 1–2 мерные ложки в коктейль Formula 1 или смешайте с 250 мл жидкости.",
    status: "available",
    rating: 4.8,
    ratingCount: 142,
  },
  {
    name: "Протеиновый батончик — Лимонный",
    slug: "protein-bar-lemon",
    categorySlug: "protein-products",
    image: "/products/protein-bar-lemon.jpg",
    price: 9500,
    description: "Умный перекус без вреда для фигуры",
    fullDescription:
      "Протеиновый батончик «Лимонный» — удобный перекус с 10 г белка. Подходит для перекуса вне дома без вреда для фигуры.",
    composition: "Белковая смесь, клетчатка, ароматизатор лимона. 10 г белка в батончике.",
    preparation: "Готов к употреблению. Храните в прохладном сухом месте.",
    status: "available",
    rating: 4.4,
    ratingCount: 65,
  },
  {
    name: "Протеиновая смесь для выпечки",
    slug: "protein-bake-mix",
    categorySlug: "nutrition",
    image: "/products/protein-bake-mix.jpg",
    price: 13500,
    description: "Полезная выпечка? Легко!",
    fullDescription:
      "Protein Bake Mix — протеиновая смесь для выпечки. Вкусная поддержка белка и пищевых волокон с витаминами и минералами.",
    composition: "Белковая смесь, клетчатка, витамины и минералы. Без добавленного сахара.",
    preparation:
      "Используйте по инструкции на упаковке для приготовления вафель, панкейков и другой выпечки.",
    status: "available",
    rating: 4.5,
    ratingCount: 41,
  },
  {
    name: "Алоэ Классический",
    slug: "aloe-classic",
    categorySlug: "aloe",
    image: "/products/aloe-classic.jpg",
    price: 14000,
    description: "Натуральный алоэ для поддержки пищеварительной системы",
    fullDescription:
      "Растительный напиток Алоэ Классический — натуральный алоэ для поддержки пищеварительной системы. Herbal Aloe Beverage Original.",
    composition: "Сок алоэ вера, растительные компоненты.",
    preparation:
      "Употребляйте по инструкции на этикетке. Хорошо взболтайте перед использованием.",
    status: "available",
    rating: 4.7,
    ratingCount: 156,
  },
  {
    name: "Овсяно-яблочный напиток",
    slug: "oat-apple-drink",
    categorySlug: "nutrition",
    image: "/products/oat-apple.jpg",
    price: 11000,
    description: "Комплекс для ежедневной поддержки пищеварительной системы",
    fullDescription:
      "Овсяно-яблочный напиток — комплекс для ежедневной поддержки пищеварительной системы. 5 г пищевых волокон и менее 15 ккал в 1 порции.",
    composition: "Овсяная мука, яблочный порошок, клетчатка. Масса нетто: 213 г.",
    preparation:
      "Смешайте порцию с 200–250 мл горячей или тёплой воды до однородной текстуры.",
    status: "available",
    rating: 4.5,
    ratingCount: 54,
  },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        sortOrder: category.sortOrder,
        isActive: true,
      },
      create: {
        name: category.name,
        slug: category.slug,
        sortOrder: category.sortOrder,
        isActive: true,
      },
    });
  }

  const dbCategories = await prisma.category.findMany();
  const categoryMap = new Map(dbCategories.map((item) => [item.slug, item.id]));

  for (const product of products) {
    const categoryId = categoryMap.get(product.categorySlug);
    if (!categoryId) {
      throw new Error(`Category not found: ${product.categorySlug}`);
    }

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        categoryId,
        image: product.image,
        price: product.price,
        description: product.description,
        fullDescription: product.fullDescription,
        composition: product.composition,
        preparation: product.preparation,
        status: product.status,
        rating: product.rating ?? null,
        ratingCount: product.ratingCount ?? null,
        isActive: true,
      },
      create: {
        name: product.name,
        slug: product.slug,
        categoryId,
        image: product.image,
        price: product.price,
        description: product.description,
        fullDescription: product.fullDescription,
        composition: product.composition,
        preparation: product.preparation,
        status: product.status,
        rating: product.rating ?? null,
        ratingCount: product.ratingCount ?? null,
        isActive: true,
      },
    });
  }

  const activeSlugs = products.map((product) => product.slug);
  await prisma.product.updateMany({
    where: {
      slug: { notIn: activeSlugs },
    },
    data: { isActive: false },
  });

  console.log(
    `Seed completed: ${categories.length} categories, ${products.length} products`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
