"use client";

import { CourseList } from "./components/CourseList/CourseList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <CourseList />
    </main>
  );
}
