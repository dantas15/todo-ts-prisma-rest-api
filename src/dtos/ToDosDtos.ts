type ICreateTodo = {
  id: number;
  title: string;
  description: string;
  dueDate?: Date;
};

type IEditTodo = Partial<ICreateTodo>;
