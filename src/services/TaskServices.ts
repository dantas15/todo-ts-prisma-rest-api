import { HttpStatusCode } from '@/controllers/protocols';
import { prisma } from '@/database';
import { AppError } from '@/errors/AppError';
import { ICreateTask, IEditTask } from '@/models/Task';

export const CreateTask = async (task: ICreateTask) => {
  return await prisma.task.create({ data: task });
};

export const EditTask = async (id: string, task: IEditTask) => {
  return await prisma.task.update({ where: { id }, data: task });
};

export const GetTasks = async () => {
  return await prisma.task.findMany({ include: { attachments: true } });
};

export const ToggleDoneState = async (id: string) => {
  const task = await prisma.task.findUnique({ where: { id } });

  if (!task) {
    throw new AppError('Task not found', HttpStatusCode.NOT_FOUND);
  }

  return await prisma.task.update({
    where: { id },
    data: { done: !task.done },
  });
};

export const DeleteTask = async (id: string) => {
  return await prisma.task.delete({ where: { id } });
};
