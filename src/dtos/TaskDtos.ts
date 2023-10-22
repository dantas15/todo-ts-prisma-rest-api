type ICreateTask = {
  id: number;
  title: string;
  description: string;
  dueDate?: Date;
};

type IEditTask = Partial<ICreateTask>;
