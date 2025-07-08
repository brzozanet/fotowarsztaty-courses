"use client";

import { LessonView } from "@/app/components/LessonView/LessonView";
import { use } from "react";

interface LessonPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  const { id } = use(params);

  return (
    <main className="min-h-screen bg-gray-50">
      <LessonView lessonId={id} />
    </main>
  );
}
