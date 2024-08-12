export type TaskType = {
  // auto
  readonly id: string;
  // input
  title: string;
  description: string | null;
  dueDate: Date | null;
  // createdAt?: Date;
  // updatedAt?: Date;
  // status
  completed: boolean;
};
