"use client";

import { LessonView } from "@/app/components/LessonView/LessonView";

interface LessonPageProps {
  params: {
    id: string;
  };
}

export default function LessonPage({ params }: LessonPageProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <LessonView lessonId={params.id} />
    </main>
  );
}
