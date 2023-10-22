import { Router } from 'express';
import { TaskController } from './TaskController';

const router = Router();

router.use('/tasks', TaskController);

export default router;
