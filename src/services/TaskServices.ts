import { prisma } from '../database';

export const CreateTask = async (task: ICreateTask) => {
  return await prisma.task.create({ data: task });
};

export const EditTask = async (id: number, task: IEditTask) => {
  return await prisma.task.update({ where: { id }, data: task });
};

export const GetTasks = async () => {
  return await prisma.task.findMany({ include: { attachments: true } });
};

export const ToggleDoneState = async (id: number) => {
  const task = await prisma.task.findUnique({ where: { id } });

  if (!task) throw new Error('Task not found');

  if (task.done) {
    return await prisma.task.update({
      where: { id },
      data: { done: false }
    });
  }

  return await prisma.task.update({
    where: { id },
    data: { done: true }
  });
};

export const DeleteTask = async (id: number) => {
  return await prisma.task.delete({ where: { id } });
};
