import { PrismaClient } from '@prisma/client';
import { initialCategories, initialCourses } from '../app/utils/initialData';

const prisma = new PrismaClient();

async function main() {
  // Usuwamy istniejące dane
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();

  console.log('Usunięto istniejące dane');

  // Dodajemy kategorie
  const categories = await Promise.all(
    initialCategories.map((category) =>
      prisma.category.create({
        data: {
          id: category.id,
          title: category.title,
        },
      })
    )
  );

  console.log('Dodano kategorie:', categories);

  // Dodajemy kursy wraz z lekcjami
  const courses = await Promise.all(
    initialCourses.map(async (course) => {
      const createdCourse = await prisma.course.create({
        data: {
          id: course.id,
          title: course.title,
          description: course.description,
        },
      });

      // Dodajemy lekcje dla kursu
      const lessons = await Promise.all(
        course.lessons.map((lesson) =>
          prisma.lesson.create({
            data: {
              id: lesson.id,
              title: lesson.title,
              description: lesson.description,
              videoUrl: lesson.videoUrl,
              courseId: createdCourse.id,
              categoryId: lesson.categoryId,
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

  console.log('Dodano kursy:', courses);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 