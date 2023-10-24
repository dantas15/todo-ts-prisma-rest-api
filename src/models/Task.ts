import { z } from 'zod';

const idSchema = z.string().uuid();

const taskSchema = z.object({
  id: idSchema.optional(),
  title: z.string(),
  description: z.string(),
  dueDate: z.date().optional(),
  userId: idSchema,
});

type Task = z.infer<typeof taskSchema>;

type EditTask = Omit<Task, 'id'>;

export { idSchema, taskSchema, Task as ICreateTask, EditTask as IEditTask };
