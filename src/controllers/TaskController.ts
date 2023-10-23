import upload from '@/middlewares/upload';
import {
  CreateTask,
  DeleteTask,
  EditTask,
  GetTasks,
  ToggleDoneState,
} from '@/services/TaskServices';
import { Router } from 'express';
import {
  AddAttachmentToTask,
  RemoveAttachmentFromTask,
} from '@/services/AttachmentsServices';
import { taskSchema } from '@/models/Task';
import { AppError } from '@/errors/AppError';

const routes = Router();

routes.get('/', async (req, res) => {
  res.send(await GetTasks());
});

routes.post('/', async (req, res) => {
  const body = req.body;

  const validatedBody = taskSchema.safeParse(body);

  if (!validatedBody.success) {
    throw new AppError(validatedBody.error);
  }

  res.send(await CreateTask(validatedBody.data));
});

routes.patch('/done/:id', async (req, res) => {
  res.send(await ToggleDoneState(req.params.id));
});

routes.put('/:id', async (req, res) => {
  res.send(await EditTask(req.params.id, req.body));
});

routes.delete('/:id', async (req, res) => {
  res.send(await DeleteTask(req.params.id));
});

routes.post(
  '/:taskId/attachment',
  upload.single('attachment'),
  async (req, res) => {
    res.send(
      await AddAttachmentToTask(
        req.params.taskId,
        req.body.name,
        req.file?.path as string
      )
    );
  }
);

// routes.delete('/attachment/:attachmentId', async (req, res) => {
//   try {
//     res.send(await RemoveAttachmentFromTask(req.params.attachmentId));
//   } catch (err) {
//     res.status(404).send({ message: err.message });
//   }
// });

export { routes as TaskController };
