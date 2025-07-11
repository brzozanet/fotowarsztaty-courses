import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// GET - Pobierz pojedynczą lekcję
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const lesson = await prisma.lesson.findUnique({
      where: { id },
      include: {
        category: true,
        course: true,
      },
    });

    if (!lesson) {
      return NextResponse.json(
        { error: "Lekcja nie została znaleziona" },
        { status: 404 }
      );
    }

    return NextResponse.json(lesson);
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return NextResponse.json(
      { error: "Błąd podczas pobierania lekcji" },
      { status: 500 }
    );
  }
}
