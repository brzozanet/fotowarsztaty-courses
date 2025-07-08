import { PrismaClient } from "@prisma/client";
import { initialCategories, initialCourses } from "../app/utils/initialData";

const prisma = new PrismaClient();

async function main() {
  // Usuwamy istniejące dane
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();

  console.log("Usunięto istniejące dane");

  // Tworzymy mapę kategorii: tytuł -> id
  const categoryMap = new Map<string, string>();

  // Dodajemy kategorie
  const categories = await Promise.all(
    initialCategories.map(async (category) => {
      const createdCategory = await prisma.category.create({
        data: {
          title: category.title,
        },
      });
      categoryMap.set(category.id, createdCategory.id);
      return createdCategory;
    })
  );

  console.log("Dodano kategorie:", categories);

  // Dodajemy kursy wraz z lekcjami
  const courses = await Promise.all(
    initialCourses.map(async (course) => {
      const createdCourse = await prisma.course.create({
        data: {
          title: course.title,
          description: course.description,
        },
      });

      // Dodajemy lekcje dla kursu
      const lessons = await Promise.all(
        course.lessons.map((lesson) =>
          prisma.lesson.create({
            data: {
              title: lesson.title,
              description: lesson.description,
              videoUrl: lesson.videoUrl,
              courseId: createdCourse.id,
              categoryId:
                categoryMap.get(lesson.categoryId) || categories[0].id,
            },
          })
        )
      );

      console.log(`Dodano ${lessons.length} lekcji do kursu ${course.title}`);

      return {
        ...createdCourse,
        lessons,
      };
    })
  );

  console.log("Dodano kursy:", courses);

  // Dodajemy testowego użytkownika
  const testUser = await prisma.user.create({
    data: {
      email: "admin@fotowarsztaty.pl",
      password: "$2a$10$K7L1OJ45/4Y2nIvL1bXzuu3hvqJcgGl8YMXCM9SJKu.YPPXz4m3m6", // hasło: admin123
      name: "Administrator",
    },
  });

  console.log("Dodano testowego użytkownika:", testUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
