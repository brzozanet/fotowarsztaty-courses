# Platforma Kursów Video

Aplikacja do zarządzania kursami video, stworzona przy użyciu Next.js, TypeScript, Zustand i Tailwind CSS.

## Funkcjonalności

- 📚 Zarządzanie kursami video
- 📝 System lekcji z kategoriami
- 👥 System użytkowników (rejestracja, logowanie)
- 🔑 Panel administracyjny
- 📱 Responsywny interfejs

## Technologie

- Next.js 14 z Turbopack
- TypeScript
- Zustand (zarządzanie stanem)
- Tailwind CSS (stylowanie)
- nanoid (generowanie ID)

## Wymagania

- Node.js (wersja 18 lub nowsza)
- npm (dołączony do Node.js)

## Instalacja

1. Sklonuj repozytorium:

```bash
git clone [adres-repozytorium]
cd fotowarsztaty-video-course
```

2. Zainstaluj zależności:

```bash
npm install
```

## Uruchomienie wersji developerskiej

1. Uruchom serwer deweloperski:

```bash
npm run dev
```

2. Otwórz przeglądarkę i przejdź pod adres:

```
http://localhost:3000
```

## Struktura aplikacji

- `/app` - główny katalog aplikacji
  - `/components` - komponenty React
  - `/store` - store'y Zustand
  - `/types` - typy TypeScript
  - `/utils` - narzędzia i dane testowe

## Dane testowe

Aplikacja zawiera predefiniowane dane testowe:

- Kurs "Adobe Lightroom - od podstaw do mistrzostwa"
- 10 lekcji podzielonych na kategorie
- 2 kategorie: "Początkujący" i "Zaawansowany"

## Dostępne strony

- `/` - strona główna z listą kursów
- `/login` - strona logowania
- `/register` - strona rejestracji
- `/admin` - panel administracyjny
- `/lesson/[id]` - strona pojedynczej lekcji

## Uwagi

- Wszystkie dane są przechowywane w pamięci (Zustand)
- Po odświeżeniu strony dane wracają do stanu początkowego
- W prawdziwej aplikacji należałoby dodać backend i bazę danych
