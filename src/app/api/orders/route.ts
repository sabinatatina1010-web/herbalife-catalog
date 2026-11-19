import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildWhatsAppUrl } from "@/lib/config";
import { formatPrice } from "@/lib/utils";
import { createOrderSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Ошибка валидации",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { productId, customerName, phone, quantity, comment } = parsed.data;

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        isActive: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Товар не найден или недоступен" },
        { status: 404 },
      );
    }

    if (product.status === "out_of_stock") {
      return NextResponse.json(
        { error: "Товар сейчас нет в наличии" },
        { status: 400 },
      );
    }

    if (!customerName.trim() || !phone.trim() || quantity < 1) {
      return NextResponse.json(
        { error: "Нельзя отправить пустую заявку" },
        { status: 400 },
      );
    }

    const order = await prisma.orderRequest.create({
      data: {
        productId: product.id,
        customerName: customerName.trim(),
        phone: phone.trim(),
        quantity,
        comment: comment?.trim() || null,
        status: "new",
      },
    });

    const total = product.price * quantity;
    const messageLines = [
      "Новая заявка Herbalife",
      `Товар: ${product.name}`,
      `Количество: ${quantity}`,
      `Сумма: ${formatPrice(total)} ₸`,
      `Имя: ${customerName.trim()}`,
      `Телефон: ${phone.trim()}`,
    ];

    if (comment?.trim()) {
      messageLines.push(`Комментарий: ${comment.trim()}`);
    }

    const whatsappUrl = buildWhatsAppUrl(messageLines.join("\n"));

    if (!whatsappUrl) {
      return NextResponse.json(
        {
          error:
            "Заявка сохранена, но номер WhatsApp не настроен. Укажите WHATSAPP_PHONE в .env",
          data: order,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        data: order,
        whatsappUrl,
        message: "Заявка успешно создана",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/orders", error);
    return NextResponse.json(
      { error: "Не удалось создать заявку" },
      { status: 500 },
    );
  }
}
