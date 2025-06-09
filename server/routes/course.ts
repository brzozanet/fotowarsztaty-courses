import express, { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { Course, Lesson, Category } from '../../app/types/models';
import { initialCategories, initialCourses } from '../../app/utils/initialData';

const router = express.Router();

// Przechowywanie danych w pamięci (docelowo powinno być w bazie danych)
let courses: Course[] = [...initialCourses];
let categories: Category[] = [...initialCategories];

// Pobieranie wszystkich kursów
router.get('/', (_req: Request, res: Response) => {
  res.json(courses);
});

// Dodawanie nowego kursu
router.post('/', (req: Request, res: Response) => {
  const { title, description } = req.body;
  const newCourse: Course = {
    id: nanoid(),
    title,
    description,
    lessons: []
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// Aktualizacja kursu
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  
  const courseIndex = courses.findIndex(c => c.id === id);
  if (courseIndex === -1) {
    return res.status(404).json({ error: 'Kurs nie został znaleziony' });
  }

  courses[courseIndex] = {
    ...courses[courseIndex],
    title,
    description
  };

  res.json(courses[courseIndex]);
});

// Usuwanie kursu
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  courses = courses.filter(course => course.id !== id);
  res.json({ success: true });
});

// Dodawanie nowej lekcji do kursu
router.post('/:courseId/lessons', (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { title, description, videoUrl, categoryId } = req.body;

  const course = courses.find(c => c.id === courseId);
  if (!course) {
    return res.status(404).json({ error: 'Kurs nie został znaleziony' });
  }

  const newLesson: Lesson = {
    id: nanoid(),
    title,
    description,
    videoUrl,
    categoryId,
    courseId
  };

  course.lessons.push(newLesson);
  res.status(201).json(newLesson);
});

// Aktualizacja lekcji
router.put('/:courseId/lessons/:lessonId', (req: Request, res: Response) => {
  const { courseId, lessonId } = req.params;
  const { title, description, videoUrl, categoryId } = req.body;

  const course = courses.find(c => c.id === courseId);
  if (!course) {
    return res.status(404).json({ error: 'Kurs nie został znaleziony' });
  }

  const lessonIndex = course.lessons.findIndex(l => l.id === lessonId);
  if (lessonIndex === -1) {
    return res.status(404).json({ error: 'Lekcja nie została znaleziona' });
  }

  course.lessons[lessonIndex] = {
    ...course.lessons[lessonIndex],
    title,
    description,
    videoUrl,
    categoryId
  };

  res.json(course.lessons[lessonIndex]);
});

// Usuwanie lekcji
router.delete('/:courseId/lessons/:lessonId', (req: Request, res: Response) => {
  const { courseId, lessonId } = req.params;

  const course = courses.find(c => c.id === courseId);
  if (!course) {
    return res.status(404).json({ error: 'Kurs nie został znaleziony' });
  }

  course.lessons = course.lessons.filter(lesson => lesson.id !== lessonId);
  res.json({ success: true });
});

// Pobieranie wszystkich kategorii
router.get('/categories', (_req: Request, res: Response) => {
  res.json(categories);
});

// Dodawanie nowej kategorii
router.post('/categories', (req: Request, res: Response) => {
  const { title } = req.body;
  const newCategory: Category = {
    id: nanoid(),
    title
  };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// Aktualizacja kategorii
router.put('/categories/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  const categoryIndex = categories.findIndex(c => c.id === id);
  if (categoryIndex === -1) {
    return res.status(404).json({ error: 'Kategoria nie została znaleziona' });
  }

  categories[categoryIndex] = {
    ...categories[categoryIndex],
    title
  };

  res.json(categories[categoryIndex]);
});

// Usuwanie kategorii
router.delete('/categories/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  categories = categories.filter(category => category.id !== id);
  res.json({ success: true });
});

export const courseRouter = router; 