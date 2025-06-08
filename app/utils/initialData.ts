import { nanoid } from "nanoid";
import { Course, Category, Lesson } from "../types/models";

export const initialCategories: Category[] = [
  {
    id: nanoid(),
    title: "Początkujący",
  },
  {
    id: nanoid(),
    title: "Zaawansowany",
  },
];

const beginnerCategoryId = initialCategories[0].id;
const advancedCategoryId = initialCategories[1].id;

const courseId = nanoid();

export const initialLessons: Lesson[] = [
  {
    id: nanoid(),
    title: "Wprowadzenie do Adobe Lightroom",
    description: "Poznaj interfejs programu i podstawowe narzędzia",
    videoUrl: "https://example.com/lesson1",
    categoryId: beginnerCategoryId,
    courseId: courseId,
  },
  {
    id: nanoid(),
    title: "Importowanie zdjęć",
    description: "Jak efektywnie importować i organizować zdjęcia w Lightroom",
    videoUrl: "https://example.com/lesson2",
    categoryId: beginnerCategoryId,
    courseId: courseId,
  },
  {
    id: nanoid(),
    title: "Podstawowa obróbka",
    description: "Podstawowe korekty ekspozycji, kontrastu i balansu bieli",
    videoUrl: "https://example.com/lesson3",
    categoryId: beginnerCategoryId,
    courseId: courseId,
  },
  {
    id: nanoid(),
    title: "Organizacja katalogu",
    description: "Jak efektywnie organizować i tagować zdjęcia",
    videoUrl: "https://example.com/lesson4",
    categoryId: beginnerCategoryId,
    courseId: courseId,
  },
  {
    id: nanoid(),
    title: "Eksport zdjęć",
    description: "Różne formaty i ustawienia eksportu",
    videoUrl: "https://example.com/lesson5",
    categoryId: beginnerCategoryId,
    courseId: courseId,
  },
  {
    id: nanoid(),
    title: "Zaawansowana korekcja kolorów",
    description: "Praca z krzywymi i mikserem kolorów",
    videoUrl: "https://example.com/lesson6",
    categoryId: advancedCategoryId,
    courseId: courseId,
  },
  {
    id: nanoid(),
    title: "Lokalna edycja",
    description: "Zaawansowane techniki lokalnej edycji zdjęć",
    videoUrl: "https://example.com/lesson7",
    categoryId: advancedCategoryId,
    courseId: courseId,
  },
  {
    id: nanoid(),
    title: "Presety i style",
    description: "Tworzenie i wykorzystywanie presetów",
    videoUrl: "https://example.com/lesson8",
    categoryId: advancedCategoryId,
    courseId: courseId,
  },
  {
    id: nanoid(),
    title: "Synchronizacja urządzeń",
    description: "Praca z Lightroom na różnych urządzeniach",
    videoUrl: "https://example.com/lesson9",
    categoryId: advancedCategoryId,
    courseId: courseId,
  },
  {
    id: nanoid(),
    title: "Publikacja i eksport",
    description: "Zaawansowane techniki eksportu i publikacji",
    videoUrl: "https://example.com/lesson10",
    categoryId: advancedCategoryId,
    courseId: courseId,
  },
];

export const initialCourses: Course[] = [
  {
    id: courseId,
    title: "Adobe Lightroom - od podstaw do mistrzostwa",
    description:
      "Kompleksowy kurs Adobe Lightroom dla fotografów. Od podstaw interfejsu po zaawansowane techniki edycji i organizacji zdjęć.",
    lessons: initialLessons,
  },
];
