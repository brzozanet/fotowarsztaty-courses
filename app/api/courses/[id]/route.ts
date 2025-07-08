import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

// PUT - Aktualizuj kurs
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { title, description } = await request.json();
    const { id } = params;

    const course = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
      },
      include: {
        lessons: {
          include: {
            category: true,
          },
        },
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Błąd podczas aktualizacji kursu" },
      { status: 500 }
    );
  }
}

// DELETE - Usuń kurs
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;

    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: "Błąd podczas usuwania kursu" },
      { status: 500 }
    );
  }
}
