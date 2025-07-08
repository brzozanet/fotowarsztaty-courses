import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// PUT - Aktualizuj kategorię
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { title } = await request.json();
    const { id } = await params;

    const category = await prisma.category.update({
      where: { id },
      data: {
        title,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Błąd podczas aktualizacji kategorii" },
      { status: 500 }
    );
  }
}

// DELETE - Usuń kategorię
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    // Sprawdź czy kategoria ma przypisane lekcje
    const lessonsCount = await prisma.lesson.count({
      where: { categoryId: id },
    });

    if (lessonsCount > 0) {
      return NextResponse.json(
        { error: "Nie można usunąć kategorii, która zawiera lekcje" },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Błąd podczas usuwania kategorii" },
      { status: 500 }
    );
  }
}
