import upload from '../middlewares/upload';
import {
  CreateTask,
  DeleteTask,
  EditTask,
  GetTasks,
  ToggleDoneState,
} from '../services/TaskServices';
import { Router } from 'express';
import {
  AddAttachmentToTask,
  RemoveAttachmentFromTask,
} from '../services/AttachmentsServices';

const routes = Router();

routes.get('/', async (req, res) => {
  res.send(await GetTasks());
});

routes.post('/', async (req, res) => {
  res.send(await CreateTask(req.body));
});

routes.patch('/done/:id', async (req, res) => {
  res.send(await ToggleDoneState(Number(req.params.id)));
});

routes.put('/:id', async (req, res) => {
  res.send(await EditTask(Number(req.params.id), req.body));
});

routes.delete('/:id', async (req, res) => {
  res.send(await DeleteTask(Number(req.params.id)));
});

routes.post(
  '/:taskId/attachment',
  upload.single('attachment'),
  async (req, res) => {
    res.send(
      await AddAttachmentToTask(
        Number(req.params.taskId),
        req.body.name,
        req.file?.path as string
      )
    );
  }
);

routes.delete('/attachment/:attachmentId', async (req, res) => {
  try {
    res.send(await RemoveAttachmentFromTask(Number(req.params.attachmentId)));
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

export { routes as TaskController };
