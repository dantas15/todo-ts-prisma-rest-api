import { prisma } from '../database';

export const AddAttachmentToTask = async (
  taskId: number,
  attachmentName: string,
  attachmentUrl: string
) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId
    }
  });

  if (!task) {
    throw new Error(`Task with id ${taskId} not found`);
  }

  const attachment = await prisma.attachment.create({
    data: {
      name: attachmentName,
      url: attachmentUrl,
      task: {
        connect: {
          id: taskId
        }
      }
    }
  });

  return attachment;
};

export const RemoveAttachmentFromTask = async (attachmentId: number) => {
  const attachment = await prisma.attachment.findUnique({
    where: {
      id: attachmentId
    },
    include: {
      task: true
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

  return attachment.task;
};
