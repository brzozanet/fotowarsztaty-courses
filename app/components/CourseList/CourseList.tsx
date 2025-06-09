"use client";

import { useEffect, useState } from "react";
import { courseApi } from "@/app/lib/api";
import { Course } from "@/app/types/models";
import Link from "next/link";

export const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
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

    loadCourses();
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dostępne kursy</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Lekcje:</h3>
                <ul className="space-y-2">
                  {course.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link
                        href={`/lesson/${lesson.id}`}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        {lesson.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
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
    </div>
  );
};
