import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

interface Params {
  params: {
    id: string;
    lessonId: string;
  };
}

// PUT - Aktualizuj lekcję
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { title, description, videoUrl, categoryId } = await request.json();
    const { lessonId } = params;

    const lesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        title,
        description,
        videoUrl,
        categoryId,
      },
      include: {
        category: true,
        course: true,
      },
    });

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Error updating lesson:", error);
    return NextResponse.json(
      { error: "Błąd podczas aktualizacji lekcji" },
      { status: 500 }
    );
  }
}

// DELETE - Usuń lekcję
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { lessonId } = params;

    await prisma.lesson.delete({
      where: { id: lessonId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return NextResponse.json(
      { error: "Błąd podczas usuwania lekcji" },
      { status: 500 }
    );
  }
}
