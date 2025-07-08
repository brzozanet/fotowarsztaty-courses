# Platforma Kursów Video

Aplikacja do zarządzania kursami video, stworzona przy użyciu Next.js, TypeScript, Prisma ORM i Tailwind CSS.

## Funkcjonalności

- 📚 Zarządzanie kursami video z bazą danych
- 📝 System lekcji z kategoriami
- 👥 System użytkowników (rejestracja, logowanie z hashowaniem haseł)
- 🔑 Panel administracyjny
- 📱 Responsywny interfejs
- 🗄️ Baza danych PostgreSQL z Prisma ORM
- 🔒 Bezpieczne hashowanie haseł z bcryptjs
- 🚀 Gotowa do deploymentu na Vercel

## Technologie

- **Frontend**: Next.js 14 z Turbopack
- **Język**: TypeScript
- **Stylowanie**: Tailwind CSS z @tailwindcss/forms i @tailwindcss/typography
- **Stan**: Zustand (zarządzanie stanem)
- **Baza danych**: PostgreSQL z Prisma ORM
- **Bezpieczeństwo**: bcryptjs (hashowanie haseł)
- **Identyfikatory**: nanoid (generowanie ID)

## Wymagania

- Node.js (wersja 18 lub nowsza)
- npm (dołączony do Node.js)
- PostgreSQL (lokalnie lub w chmurze np. Neon)

## Instalacja

1. Sklonuj repozytorium:

```bash
git clone [adres-repozytorium]
cd fotowarsztaty-video
```

2. Zainstaluj zależności:

```bash
npm install
```

3. Skonfiguruj zmienne środowiskowe:

```bash
cp env.example .env
```

Edytuj plik `.env` i ustaw:

- `DATABASE_URL` - URL do bazy danych PostgreSQL
- `DIRECT_URL` - Bezpośredni URL do bazy danych (dla migracji)
- `NEXTAUTH_SECRET` - Sekretny klucz dla NextAuth.js
- `NEXTAUTH_URL` - URL aplikacji (localhost:3000 dla rozwoju)

4. Wygeneruj klienta Prisma i wykonaj migracje:

```bash
npm run db:generate
npm run db:push
```

5. (Opcjonalnie) Załaduj dane testowe:

```bash
npm run db:seed
```

## Uruchomienie

### Wersja developerska

```bash
npm run dev
```

### Wersja produkcyjna

```bash
npm run build
npm start
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

## Skrypty NPM

- `npm run dev` - Uruchom serwer deweloperski z Turbopack
- `npm run build` - Zbuduj aplikację produkcyjną
- `npm run start` - Uruchom aplikację produkcyjną
- `npm run lint` - Sprawdź kod z ESLint
- `npm run db:generate` - Wygeneruj klienta Prisma
- `npm run db:push` - Wypchaj schemat do bazy danych
- `npm run db:migrate` - Utwórz i zastosuj migracje
- `npm run db:seed` - Załaduj dane testowe
- `npm run db:studio` - Otwórz Prisma Studio

## Struktura aplikacji

```
fotowarsztaty-video/
├── app/                    # Główny katalog aplikacji Next.js
│   ├── api/               # API Routes
│   │   ├── categories/    # Endpointy kategorii
│   │   ├── courses/       # Endpointy kursów
│   │   └── users/         # Endpointy użytkowników
│   ├── components/        # Komponenty React
│   ├── lib/              # Biblioteki (Prisma client, API helpers)
│   ├── store/            # Store'y Zustand
│   ├── types/            # Typy TypeScript
│   └── utils/            # Narzędzia i dane testowe
├── prisma/               # Konfiguracja bazy danych
│   ├── schema.prisma     # Schemat bazy danych
│   └── seed.ts          # Dane testowe
└── server/              # Dodatkowe pliki serwera
```

## Modele bazy danych

### Course (Kurs)

- id, title, description
- Relacja: jeden do wielu z Lesson

### Lesson (Lekcja)

- id, title, description, videoUrl
- Relacje: należy do Course i Category

### Category (Kategoria)

- id, title
- Relacja: jeden do wielu z Lesson

### User (Użytkownik)

- id, email, password (hashowane), name
- Unikalne: email

## API Endpoints

### Kursy

- `GET /api/courses` - Lista wszystkich kursów
- `POST /api/courses` - Utwórz nowy kurs
- `GET /api/courses/[id]` - Pobierz szczegóły kursu
- `PUT /api/courses/[id]` - Zaktualizuj kurs
- `DELETE /api/courses/[id]` - Usuń kurs

### Lekcje

- `GET /api/courses/[courseId]/lessons` - Lista lekcji kursu
- `POST /api/courses/[courseId]/lessons` - Dodaj lekcję do kursu
- `GET /api/courses/[courseId]/lessons/[lessonId]` - Szczegóły lekcji
- `PUT /api/courses/[courseId]/lessons/[lessonId]` - Zaktualizuj lekcję
- `DELETE /api/courses/[courseId]/lessons/[lessonId]` - Usuń lekcję

### Kategorie

- `GET /api/categories` - Lista kategorii
- `POST /api/categories` - Utwórz kategorię
- `PUT /api/categories/[id]` - Zaktualizuj kategorię
- `DELETE /api/categories/[id]` - Usuń kategorię

### Użytkownicy

- `POST /api/users/register` - Rejestracja użytkownika
- `POST /api/users/login` - Logowanie użytkownika
- `POST /api/users/logout` - Wylogowanie użytkownika

## Dostępne strony

- `/` - strona główna z listą kursów
- `/login` - strona logowania
- `/register` - strona rejestracji
- `/admin` - panel administracyjny
- `/lesson/[id]` - strona pojedynczej lekcji

## Deployment na Vercel

1. Podłącz repozytorium do Vercel
2. Ustaw zmienne środowiskowe w panelu Vercel
3. Aplikacja zostanie automatycznie zdeployowana

## Uwagi deweloperskie

- Aplikacja używa PostgreSQL jako bazy danych
- Hasła użytkowników są bezpiecznie hashowane z bcryptjs
- Prisma ORM zapewnia type-safe dostęp do bazy danych
- API routes są w pełni zintegrowane z Next.js App Router
- Aplikacja jest gotowa do produkcji z pełną obsługą bazy danych

## Przykładowe dane

Po uruchomieniu `npm run db:seed` aplikacja zawiera:

- Przykładowy kurs "Adobe Lightroom - od podstaw do mistrzostwa"
- 10 lekcji podzielonych na kategorie
- 2 kategorie: "Początkujący" i "Zaawansowany"
