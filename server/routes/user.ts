import express, { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { User } from '../../app/types/models';

const router = express.Router();

// Przechowywanie użytkowników w pamięci (docelowo powinno być w bazie danych)
let users: User[] = [];

// Rejestracja użytkownika
router.post('/register', (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'Użytkownik o podanym emailu już istnieje' });
  }

  const newUser: User = {
    id: nanoid(),
    email,
    password, // W prawdziwej aplikacji hasło powinno być zahashowane
    name
  };

  users.push(newUser);
  res.status(201).json({ success: true });
});

// Logowanie użytkownika
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Nieprawidłowy email lub hasło' });
  }

  res.json({ user });
});

// Wylogowanie użytkownika
router.post('/logout', (_req: Request, res: Response) => {
  res.json({ success: true });
});

export const userRouter = router; 