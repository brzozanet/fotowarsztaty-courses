// INFO: turn off by Claude
// WYŁĄCZONY - Aplikacja używa teraz Prisma + API zamiast Zustand store
// Wszystkie dane są pobierane z bazy danych przez API endpoints

import { Course, Lesson, Category } from "../types/models";

interface CourseStore {
  courses: Course[];
  categories: Category[];
  addCourse: (title: string, description: string) => void;
  updateCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  addLesson: (
    courseId: string,
    title: string,
    description: string,
    videoUrl: string,
    categoryId: string
  ) => void;
  updateLesson: (lesson: Lesson) => void;
  deleteLesson: (courseId: string, lessonId: string) => void;
  addCategory: (title: string) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
}

// Pusta implementacja - wszystkie dane teraz przez API
export const useCourseStore = (): CourseStore => ({
  courses: [],
  categories: [],
  addCourse: () => {
    console.warn("useCourseStore jest wyłączony - używaj API zamiast tego");
  },
  updateCourse: () => {
    console.warn("useCourseStore jest wyłączony - używaj API zamiast tego");
  },
  deleteCourse: () => {
    console.warn("useCourseStore jest wyłączony - używaj API zamiast tego");
  },
  addLesson: () => {
    console.warn("useCourseStore jest wyłączony - używaj API zamiast tego");
  },
  updateLesson: () => {
    console.warn("useCourseStore jest wyłączony - używaj API zamiast tego");
  },
  deleteLesson: () => {
    console.warn("useCourseStore jest wyłączony - używaj API zamiast tego");
  },
  addCategory: () => {
    console.warn("useCourseStore jest wyłączony - używaj API zamiast tego");
  },
  updateCategory: () => {
    console.warn("useCourseStore jest wyłączony - używaj API zamiast tego");
  },
  deleteCategory: () => {
    console.warn("useCourseStore jest wyłączony - używaj API zamiast tego");
  },
});
