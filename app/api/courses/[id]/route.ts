import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { revalidateCoursesData } from "@/app/lib/cache";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

// PUT - Aktualizuj kurs
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { title, description } = await request.json();
    const { id } = await params;

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

    // Revalidate cache po aktualizacji kursu
    await revalidateCoursesData();
    console.log("✅ Cache revalidated after updating course");

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
    const { id } = await params;

    await prisma.course.delete({
      where: { id },
    });

    // Revalidate cache po usunięciu kursu
    await revalidateCoursesData();
    console.log("✅ Cache revalidated after deleting course");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: "Błąd podczas usuwania kursu" },
      { status: 500 }
    );
  }
}
