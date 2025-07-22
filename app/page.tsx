import { getCachedCourses } from "@/app/lib/cache";
import Link from "next/link";

export default async function HomePage() {
  // Dane pobierane na serwerze z cache
  const courses = await getCachedCourses();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dostępne kursy</h1>

        {courses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Brak dostępnych kursów</p>
            <Link
              href="/admin"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Dodaj pierwszy kurs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">{course.title}</h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>

                  {course.lessons.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">
                        Lekcje ({course.lessons.length}):
                      </h3>
                      <ul className="space-y-2 max-h-32 overflow-y-auto">
                        {course.lessons.slice(0, 3).map((lesson) => (
                          <li key={lesson.id}>
                            <Link
                              href={`/lesson/${lesson.id}`}
                              className="text-blue-500 hover:text-blue-600 text-sm"
                            >
                              {lesson.title}
                            </Link>
                          </li>
                        ))}
                        {course.lessons.length > 3 && (
                          <li className="text-gray-500 text-sm">
                            ... i {course.lessons.length - 3} więcej
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  <Link
                    href={`/course/${course.id}`}
                    className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Zobacz szczegóły
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// ISR Configuration - strona będzie regenerowana co 5 minut
export const revalidate = 300;
