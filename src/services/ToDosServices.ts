import { prisma } from '../database';

export const CreateTodo = async (todo: ICreateTodo) => {
  return await prisma.toDo.create({ data: todo });
};

export const EditTodo = async (id: number, todo: IEditTodo) => {
  return await prisma.toDo.update({ where: { id }, data: todo });
};

export const GetTodos = async () => {
  return await prisma.toDo.findMany({ include: { attachments: true } });
};

export const ToggleDoneState = async (id: number) => {
  const todo = await prisma.toDo.findUnique({ where: { id } });

  if (!todo) throw new Error('Todo not found');

  if (todo.done) {
    return await prisma.toDo.update({
      where: { id },
      data: { done: false }
    });
  }

  return await prisma.toDo.update({
    where: { id },
    data: { done: true }
  });
};

export const DeleteTodo = async (id: number) => {
  return await prisma.toDo.delete({ where: { id } });
};
