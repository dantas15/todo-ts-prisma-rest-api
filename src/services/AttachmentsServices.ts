import { prisma } from '../database';

export const AddAttachmentToTodo = async (
  todoId: number,
  attachmentName: string,
  attachmentUrl: string
) => {
  const todo = await prisma.toDo.findUnique({
    where: {
      id: todoId
    }
  });

  if (!todo) {
    throw new Error(`Todo with id ${todoId} not found`);
  }

  const attachment = await prisma.attachment.create({
    data: {
      name: attachmentName,
      url: attachmentUrl,
      todo: {
        connect: {
          id: todoId
        }
      }
    }
  });

  return attachment;
};

export const RemoveAttachmentFromTodo = async (attachmentId: number) => {
  const attachment = await prisma.attachment.findUnique({
    where: {
      id: attachmentId
    },
    include: {
      todo: true
    }
  });

  if (!attachment) {
    throw new Error(`Attachment with id ${attachmentId} not found`);
  }

  await prisma.attachment.delete({
    where: {
      id: attachmentId
    }
  });

  return attachment.todo;
};
