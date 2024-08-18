export type TaskType = {
  // auto
  readonly id: number;
  // input
  title: string;
  description: string | null;
  dueDate: string | null;
  // createdAt: string;
  // updatedAt: string | null;
  // status
  isDone: boolean;
};

// 'Create'でBaseModalを使う時のデフォルト生成用．
// NewTaskTypeとUnionしても良さそうに思えるが，idにアクセスするときにundefinedじゃない保証が面倒なので．
export class DefaultTask implements TaskType {
  readonly id: number = -1; // dummy
  title: string = '';
  description: string | null = null;
  dueDate: string | null = null;
  isDone: boolean = false;
}

export type NewTaskType = {
  title: string;
  description: string | null;
  dueDate: string | null;
  isDone: boolean;
};
