import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

interface Params {
  params: {
    courseId: string;
  };
}

// POST - Dodaj lekcję do kursu
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { title, description, videoUrl, categoryId } = await request.json();
    const { courseId } = params;

    // Sprawdź czy kurs istnieje
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json(
        { error: "Kurs nie został znaleziony" },
        { status: 404 }
      );
    }

    // Sprawdź czy kategoria istnieje
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Kategoria nie została znaleziona" },
        { status: 404 }
      );
    }

    const lesson = await prisma.lesson.create({
      data: {
        title,
        description,
        videoUrl,
        courseId,
        categoryId,
      },
      include: {
        category: true,
        course: true,
      },
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    console.error("Error creating lesson:", error);
    return NextResponse.json(
      { error: "Błąd podczas tworzenia lekcji" },
      { status: 500 }
    );
  }
}
