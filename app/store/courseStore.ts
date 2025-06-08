import { create } from "zustand";
import { nanoid } from "nanoid";
import { Course, Lesson, Category } from "../types/models";
import { initialCategories, initialCourses } from "../utils/initialData";

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

export const useCourseStore = create<CourseStore>((set) => ({
  courses: initialCourses,
  categories: initialCategories,

  addCourse: (title: string, description: string) => {
    set((state) => ({
      courses: [
        ...state.courses,
        { id: nanoid(), title, description, lessons: [] },
      ],
    }));
  },

  updateCourse: (updatedCourse: Course) => {
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      ),
    }));
  },

  deleteCourse: (id: string) => {
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== id),
    }));
  },

  addLesson: (
    courseId: string,
    title: string,
    description: string,
    videoUrl: string,
    categoryId: string
  ) => {
    const newLesson: Lesson = {
      id: nanoid(),
      title,
      description,
      videoUrl,
      categoryId,
      courseId,
    };

    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? { ...course, lessons: [...course.lessons, newLesson] }
          : course
      ),
    }));
  },

  updateLesson: (updatedLesson: Lesson) => {
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === updatedLesson.courseId
          ? {
              ...course,
              lessons: course.lessons.map((lesson) =>
                lesson.id === updatedLesson.id ? updatedLesson : lesson
              ),
            }
          : course
      ),
    }));
  },

  deleteLesson: (courseId: string, lessonId: string) => {
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              lessons: course.lessons.filter(
                (lesson) => lesson.id !== lessonId
              ),
            }
          : course
      ),
    }));
  },

  addCategory: (title: string) => {
    set((state) => ({
      categories: [...state.categories, { id: nanoid(), title }],
    }));
  },

  updateCategory: (updatedCategory: Category) => {
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === updatedCategory.id ? updatedCategory : category
      ),
    }));
  },

  deleteCategory: (id: string) => {
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    }));
  },
}));
