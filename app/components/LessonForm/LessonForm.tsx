"use client";

import { useState, useEffect } from "react";
import { useCourseStore } from "@/app/store/courseStore";
import { Lesson } from "@/app/types/models";

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

  const courses = useCourseStore((state) => state.courses);
  const categories = useCourseStore((state) => state.categories);
  const addLesson = useCourseStore((state) => state.addLesson);
  const updateLesson = useCourseStore((state) => state.updateLesson);

  useEffect(() => {
    if (lessonId) {
      const course = courses.find((c) => c.id === courseId);
      const lesson = course?.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        setTitle(lesson.title);
        setDescription(lesson.description);
        setVideoUrl(lesson.videoUrl);
        setCategoryId(lesson.categoryId);
      }
    }
  }, [lessonId, courseId, courses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (lessonId) {
      const course = courses.find((c) => c.id === courseId);
      const lesson = course?.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        updateLesson({
          ...lesson,
          title,
          description,
          videoUrl,
          categoryId,
        });
      }
    } else {
      addLesson(courseId, title, description, videoUrl, categoryId);
    }

    setTitle("");
    setDescription("");
    setVideoUrl("");
    setCategoryId("");
    onSubmit?.();
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {lessonId ? "Zapisz zmiany" : "Dodaj lekcję"}
        </button>
      </form>
    </div>
  );
};
