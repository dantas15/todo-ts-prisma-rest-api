import { Router } from 'express';
import ToDos from './ToDos';

const router = Router();

router.use('/todos', ToDos);

export default router;
