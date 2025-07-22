import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { revalidateCoursesData } from "@/app/lib/cache";

// GET - Pobierz wszystkie kursy
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        lessons: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Błąd podczas pobierania kursów" },
      { status: 500 }
    );
  }
}

// POST - Utwórz nowy kurs
export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json();

    const course = await prisma.course.create({
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

    // Revalidate cache po dodaniu kursu
    await revalidateCoursesData();
    console.log("✅ Cache revalidated after creating course");

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Błąd podczas tworzenia kursu" },
      { status: 500 }
    );
  }
}
