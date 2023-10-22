import { z } from 'zod';

const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  dueDate: z.date().optional(),
});

type ICreateTask = z.infer<typeof taskSchema>;

type IEditTask = Partial<ICreateTask>;

export { taskSchema, ICreateTask, IEditTask };
