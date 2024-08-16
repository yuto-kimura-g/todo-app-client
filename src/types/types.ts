export type TaskType = {
  // auto
  readonly id: number;
  // input
  title: string;
  description: string | null;
  dueDate: Date | null;
  // createdAt?: Date;
  // updatedAt?: Date;
  // status
  isDone: boolean;
};

export type NewTaskType = {
  title: string;
  description: string | null;
  dueDate: Date | null;
  isDone: boolean;
};
