export interface Category {
  id: string;
  title: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  categoryId: string;
  courseId: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}
