"use client";

import { useState, useEffect } from "react";
import { courseApi, categoryApi } from "@/app/lib/api";
import { Category, Course } from "@/app/types/models";

interface LessonFormProps {
  courseId: string;
  lessonId?: string;
  onSubmit?: () => void;
}

export const LessonForm = ({
  courseId,
  lessonId,
  onSubmit,
}: LessonFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        // Pobierz kategorie
        const categoriesData = await categoryApi.getAllCategories();
        setCategories(categoriesData);

        // Jeśli edytujemy lekcję, pobierz jej dane
        if (lessonId) {
          const courses = await courseApi.getAllCourses();
          const course = courses.find((c) => c.id === courseId);
          const lesson = course?.lessons.find((l) => l.id === lessonId);
          if (lesson) {
            setTitle(lesson.title);
            setDescription(lesson.description);
            setVideoUrl(lesson.videoUrl);
            setCategoryId(lesson.categoryId);
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Błąd podczas ładowania danych");
        }
      }
    };

    loadData();
  }, [courseId, lessonId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (lessonId) {
        await courseApi.updateLesson({
          id: lessonId,
          courseId,
          title,
          description,
          videoUrl,
          categoryId,
        });
      } else {
        await courseApi.createLesson(
          courseId,
          title,
          description,
          videoUrl,
          categoryId
        );
      }

      setTitle("");
      setDescription("");
      setVideoUrl("");
      setCategoryId("");
      onSubmit?.();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Wystąpił błąd podczas zapisywania lekcji");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        {lessonId ? "Edytuj lekcję" : "Dodaj nową lekcję"}
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
        <div>
          <label
            htmlFor="videoUrl"
            className="block text-sm font-medium text-gray-700"
          >
            URL Video
          </label>
          <input
            type="url"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Kategoria
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Wybierz kategorię</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {lessonId ? "Zapisz zmiany" : "Dodaj lekcję"}
        </button>
      </form>
    </div>
  );
};
