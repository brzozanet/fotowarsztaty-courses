import { getCachedCourse, getCachedCourses } from "@/app/lib/cache";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export default async function CoursePage({ params }: Params) {
  const { id } = await params;
  const course = await getCachedCourse(id);

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
        >
          ← Powrót do kursów
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6">{course.title}</h1>
        <p className="text-gray-700 text-lg mb-8">{course.description}</p>

        {course.lessons.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Lekcje ({course.lessons.length})
            </h2>
            <div className="grid gap-4">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                          Lekcja {index + 1}
                        </span>
                        <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded">
                          {lesson.category.title}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{lesson.description}</p>
                    </div>
                  </div>
                  <Link
                    href={`/lesson/${lesson.id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Oglądaj lekcję
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Ten kurs nie ma jeszcze lekcji</p>
            <Link
              href="/admin"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Dodaj lekcje
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ISR Configuration
export const revalidate = 300;

// Generate static paths dla najważniejszych kursów
export async function generateStaticParams() {
  const courses = await getCachedCourses();

  // Generuj statyczne strony dla wszystkich kursów
  return courses.map((course) => ({
    id: course.id,
  }));
}
