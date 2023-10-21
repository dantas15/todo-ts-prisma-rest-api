import upload from '../middlewares/upload';
import {
  CreateTodo,
  DeleteTodo,
  EditTodo,
  GetTodos,
  ToggleDoneState
} from '../services/ToDosServices';
import { Router } from 'express';
import {
  AddAttachmentToTodo,
  RemoveAttachmentFromTodo
} from '../services/AttachmentsServices';

const ToDos = Router();

ToDos.get('/', async (req, res) => {
  res.send(await GetTodos());
});

ToDos.post('/', async (req, res) => {
  res.send(await CreateTodo(req.body));
});

ToDos.patch('/done/:id', async (req, res) => {
  res.send(await ToggleDoneState(Number(req.params.id)));
});

ToDos.put('/:id', async (req, res) => {
  res.send(await EditTodo(Number(req.params.id), req.body));
});

ToDos.delete('/:id', async (req, res) => {
  res.send(await DeleteTodo(Number(req.params.id)));
});

ToDos.post(
  '/:todoId/attachment',
  upload.single('attachment'),
  async (req, res) => {
    res.send(
      await AddAttachmentToTodo(
        Number(req.params.todoId),
        req.body.name,
        req.file?.path as string
      )
    );
  }
);

ToDos.delete('/attachment/:attachmentId', async (req, res) => {
  try {
    res.send(await RemoveAttachmentFromTodo(Number(req.params.attachmentId)));
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

export default ToDos;
