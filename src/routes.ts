import { Router } from 'express';
import { TaskController } from '@/controllers/TaskController';

const router = Router();

router.use('/tasks', TaskController);

export { router };
