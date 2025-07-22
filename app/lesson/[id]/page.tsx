import { getCachedLesson } from "@/app/lib/cache";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export default async function LessonPage({ params }: Params) {
  const { id } = await params;
  const lesson = await getCachedLesson(id);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href={`/course/${lesson.course.id}`}
          className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
        >
          ← Powrót do kursu: {lesson.course.title}
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header lekcji */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {lesson.category.title}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
          <p className="text-gray-700 text-lg">{lesson.description}</p>
        </div>

        {/* Video player */}
        <div className="aspect-video bg-black">
          <iframe
            src={lesson.videoUrl}
            className="w-full h-full"
            allowFullScreen
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Szczegóły lekcji */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">
                Informacje o lekcji
              </h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-600">Kurs:</dt>
                  <dd className="font-medium">{lesson.course.title}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">Kategoria:</dt>
                  <dd className="font-medium">{lesson.category.title}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">Nawigacja</h3>
              <div className="space-y-3">
                <Link
                  href={`/course/${lesson.course.id}`}
                  className="block bg-blue-50 text-blue-700 p-3 rounded-md hover:bg-blue-100 transition-colors"
                >
                  Zobacz wszystkie lekcje kursu →
                </Link>
                <Link
                  href="/"
                  className="block bg-gray-50 text-gray-700 p-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Powrót do wszystkich kursów →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ISR Configuration
export const revalidate = 300;
