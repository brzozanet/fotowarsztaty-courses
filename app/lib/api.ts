import { Course, Lesson, Category, User } from "../types/models";

const API_URL = "/api";

// Funkcje pomocnicze do obsługi błędów
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Wystąpił błąd");
  }
  return response.json();
};

// API użytkowników
export const userApi = {
  register: async (email: string, password: string, name: string) => {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    return handleResponse(response);
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/users/logout`, {
      method: "POST",
    });
    return handleResponse(response);
  },
};

// API kursów
export const courseApi = {
  getAllCourses: async (): Promise<Course[]> => {
    const response = await fetch(`${API_URL}/courses`);
    return handleResponse(response);
  },

  createCourse: async (title: string, description: string): Promise<Course> => {
    const response = await fetch(`${API_URL}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    return handleResponse(response);
  },

  updateCourse: async (course: Course): Promise<Course> => {
    const response = await fetch(`${API_URL}/courses/${course.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    });
    return handleResponse(response);
  },

  deleteCourse: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/courses/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },

  createLesson: async (
    courseId: string,
    title: string,
    description: string,
    videoUrl: string,
    categoryId: string
  ): Promise<Lesson> => {
    const response = await fetch(`${API_URL}/courses/${courseId}/lessons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, videoUrl, categoryId }),
    });
    return handleResponse(response);
  },

  updateLesson: async (lesson: Lesson): Promise<Lesson> => {
    const response = await fetch(
      `${API_URL}/courses/${lesson.courseId}/lessons/${lesson.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lesson),
      }
    );
    return handleResponse(response);
  },

  deleteLesson: async (courseId: string, lessonId: string): Promise<void> => {
    const response = await fetch(
      `${API_URL}/courses/${courseId}/lessons/${lessonId}`,
      {
        method: "DELETE",
      }
    );
    return handleResponse(response);
  },
};

// API lekcji
export const lessonApi = {
  getLessonById: async (id: string): Promise<Lesson> => {
    const response = await fetch(`${API_URL}/lessons/${id}`);
    return handleResponse(response);
  },
};

// API kategorii
export const categoryApi = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${API_URL}/categories`);
    return handleResponse(response);
  },

  createCategory: async (title: string): Promise<Category> => {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    return handleResponse(response);
  },

  updateCategory: async (category: Category): Promise<Category> => {
    const response = await fetch(`${API_URL}/categories/${category.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    return handleResponse(response);
  },

  deleteCategory: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};
