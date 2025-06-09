"use client";

import { useState, useEffect } from "react";
import { courseApi } from "@/app/lib/api";
import { Course } from "@/app/types/models";

interface CourseFormProps {
  courseId?: string;
  onSubmit?: () => void;
}

export const CourseForm = ({ courseId, onSubmit }: CourseFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      if (courseId) {
        try {
          const courses = await courseApi.getAllCourses();
          const course = courses.find((c) => c.id === courseId);
          if (course) {
            setTitle(course.title);
            setDescription(course.description);
          }
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Błąd podczas ładowania kursu");
          }
        }
      }
    };

    loadCourse();
  }, [courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (courseId) {
        await courseApi.updateCourse({
          id: courseId,
          title,
          description,
          lessons: [], // Aktualne lekcje zostaną zachowane na serwerze
        });
      } else {
        await courseApi.createCourse(title, description);
      }

      setTitle("");
      setDescription("");
      onSubmit?.();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Wystąpił błąd podczas zapisywania kursu");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        {courseId ? "Edytuj kurs" : "Dodaj nowy kurs"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Tytuł
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Opis
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {courseId ? "Zapisz zmiany" : "Dodaj kurs"}
        </button>
      </form>
    </div>
  );
};
