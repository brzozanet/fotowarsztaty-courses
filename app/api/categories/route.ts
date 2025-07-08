import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

// GET - Pobierz wszystkie kategorie
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        title: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Błąd podczas pobierania kategorii" },
      { status: 500 }
    );
  }
}

// POST - Utwórz nową kategorię
export async function POST(request: NextRequest) {
  try {
    const { title } = await request.json();

    const category = await prisma.category.create({
      data: {
        title,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Błąd podczas tworzenia kategorii" },
      { status: 500 }
    );
  }
}
