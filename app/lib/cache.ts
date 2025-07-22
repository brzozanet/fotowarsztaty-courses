import { unstable_cache } from "next/cache";
import { prisma } from "@/app/lib/prisma";

// Cache dla wszystkich kursów
export const getCachedCourses = unstable_cache(
  async () => {
    console.log("🔄 Fetching courses from database...");

    return await prisma.course.findMany({
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
  },
  ["courses"],
  {
    revalidate: 300, // 5 minut cache
    tags: ["courses"],
  }
);

// Cache dla pojedynczego kursu
export const getCachedCourse = unstable_cache(
  async (id: string) => {
    console.log(`🔄 Fetching course ${id} from database...`);

    return await prisma.course.findUnique({
      where: { id },
      include: {
        lessons: {
          include: {
            category: true,
          },
        },
      },
    });
  },
  ["course"],
  {
    revalidate: 300,
    tags: ["course"],
  }
);

// Cache dla pojedynczej lekcji
export const getCachedLesson = unstable_cache(
  async (id: string) => {
    console.log(`🔄 Fetching lesson ${id} from database...`);

    return await prisma.lesson.findUnique({
      where: { id },
      include: {
        category: true,
        course: true,
      },
    });
  },
  ["lesson"],
  {
    revalidate: 300,
    tags: ["lesson"],
  }
);

// Cache dla kategorii
export const getCachedCategories = unstable_cache(
  async () => {
    console.log("🔄 Fetching categories from database...");

    return await prisma.category.findMany({
      orderBy: {
        title: "asc",
      },
    });
  },
  ["categories"],
  {
    revalidate: 600, // 10 minut cache (rzadziej się zmieniają)
    tags: ["categories"],
  }
);

// Funkcje do revalidation po mutacjach
export async function revalidateCoursesData() {
  const { revalidateTag } = await import("next/cache");
  console.log("🔄 Revalidating courses cache...");
  revalidateTag("courses");
  revalidateTag("course");
}

export async function revalidateLessonsData() {
  const { revalidateTag } = await import("next/cache");
  console.log("🔄 Revalidating lessons cache...");
  revalidateTag("lesson");
  revalidateTag("courses"); // lekcje wpływają na kursy
}

export async function revalidateCategoriesData() {
  const { revalidateTag } = await import("next/cache");
  console.log("🔄 Revalidating categories cache...");
  revalidateTag("categories");
}
