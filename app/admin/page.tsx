"use client";

import { useState } from "react";
import { CourseForm } from "@/app/components/CourseForm/CourseForm";
import { LessonForm } from "@/app/components/LessonForm/LessonForm";
import { useCourseStore } from "@/app/store/courseStore";

export default function AdminPage() {
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const courses = useCourseStore((state) => state.courses);
  const deleteCourse = useCourseStore((state) => state.deleteCourse);
  const deleteLesson = useCourseStore((state) => state.deleteLesson);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Panel administracyjny</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Zarządzanie kursami</h2>
            <CourseForm />

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Lista kursów</h3>
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white p-4 rounded-lg shadow mb-4"
                >
                  <h4 className="font-bold">{course.title}</h4>
                  <p className="text-gray-600 mb-2">{course.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCourseId(course.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Dodaj lekcję
                    </button>
                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Usuń kurs
                    </button>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-bold mb-2">Lekcje:</h5>
                    <ul className="space-y-2">
                      {course.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex justify-between items-center"
                        >
                          <span>{lesson.title}</span>
                          <button
                            onClick={() => deleteLesson(course.id, lesson.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            Usuń
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Dodaj lekcję</h2>
            {selectedCourseId ? (
              <LessonForm
                courseId={selectedCourseId}
                onSubmit={() => setSelectedCourseId("")}
              />
            ) : (
              <p className="text-gray-600">
                Wybierz kurs, aby dodać do niego lekcję
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
