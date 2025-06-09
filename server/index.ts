import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user';
import { courseRouter } from './routes/course';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routery
app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 