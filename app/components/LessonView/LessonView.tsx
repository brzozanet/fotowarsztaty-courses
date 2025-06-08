"use client";

import { useCourseStore } from "@/app/store/courseStore";
import { useEffect, useState } from "react";
import { Lesson } from "@/app/types/models";

interface LessonViewProps {
  lessonId: string;
}

export const LessonView = ({ lessonId }: LessonViewProps) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const courses = useCourseStore((state) => state.courses);

  useEffect(() => {
    const foundLesson = courses
      .flatMap((course) => course.lessons)
      .find((lesson) => lesson.id === lessonId);
    setLesson(foundLesson || null);
  }, [courses, lessonId]);

  if (!lesson) {
    return (
      <div className="text-center py-8">Lekcja nie została znaleziona</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
      <div className="aspect-w-16 aspect-h-9 mb-8">
        <iframe
          src={lesson.videoUrl}
          className="w-full h-full"
          allowFullScreen
          title={lesson.title}
        />
      </div>
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">Opis</h2>
        <p className="text-gray-700">{lesson.description}</p>
      </div>
    </div>
  );
};
