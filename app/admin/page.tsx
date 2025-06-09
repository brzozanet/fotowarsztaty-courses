"use client";

import { useState, useEffect } from "react";
import { CourseForm } from "@/app/components/CourseForm/CourseForm";
import { LessonForm } from "@/app/components/LessonForm/LessonForm";
import { courseApi } from "@/app/lib/api";
import { Course } from "@/app/types/models";

export default function AdminPage() {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState("");

  const loadCourses = async () => {
    try {
      const coursesData = await courseApi.getAllCourses();
      setCourses(coursesData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Błąd podczas ładowania kursów");
      }
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDeleteCourse = async (id: string) => {
    try {
      await courseApi.deleteCourse(id);
      await loadCourses();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Błąd podczas usuwania kursu");
      }
    }
  };

  const handleDeleteLesson = async (courseId: string, lessonId: string) => {
    try {
      await courseApi.deleteLesson(courseId, lessonId);
      await loadCourses();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Błąd podczas usuwania lekcji");
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Panel administracyjny</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Zarządzanie kursami</h2>
            <CourseForm onSubmit={loadCourses} />

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Lista kursów</h3>
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white p-4 rounded-lg shadow mb-4"
                >
                  <h4 className="font-bold">{course.title}</h4>
                  <p className="text-gray-600 mb-2">{course.description}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedCourseId(course.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edytuj
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Usuń
                    </button>
                  </div>
                  {course.lessons.length > 0 && (
                    <div className="mt-2">
                      <h5 className="font-semibold mb-1">Lekcje:</h5>
                      <ul className="space-y-1">
                        {course.lessons.map((lesson) => (
                          <li
                            key={lesson.id}
                            className="flex justify-between items-center"
                          >
                            <span>{lesson.title}</span>
                            <button
                              onClick={() =>
                                handleDeleteLesson(course.id, lesson.id)
                              }
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Usuń
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Zarządzanie lekcjami</h2>
            {selectedCourseId ? (
              <>
                <LessonForm
                  courseId={selectedCourseId}
                  onSubmit={loadCourses}
                />
                <button
                  onClick={() => setSelectedCourseId("")}
                  className="mt-4 text-gray-600 hover:text-gray-800"
                >
                  Anuluj wybór kursu
                </button>
              </>
            ) : (
              <p className="text-gray-600">
                Wybierz kurs z listy, aby dodać lub edytować lekcje
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
