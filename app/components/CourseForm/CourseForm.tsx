"use client";

import { useState, useEffect } from "react";
import { useCourseStore } from "@/app/store/courseStore";
import { Course } from "@/app/types/models";

interface CourseFormProps {
  courseId?: string;
  onSubmit?: () => void;
}

export const CourseForm = ({ courseId, onSubmit }: CourseFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addCourse = useCourseStore((state) => state.addCourse);
  const updateCourse = useCourseStore((state) => state.updateCourse);
  const courses = useCourseStore((state) => state.courses);

  useEffect(() => {
    if (courseId) {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        setTitle(course.title);
        setDescription(course.description);
      }
    }
  }, [courseId, courses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (courseId) {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        updateCourse({
          ...course,
          title,
          description,
        });
      }
    } else {
      addCourse(title, description);
    }

    setTitle("");
    setDescription("");
    onSubmit?.();
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {courseId ? "Zapisz zmiany" : "Dodaj kurs"}
        </button>
      </form>
    </div>
  );
};
