export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
};

export enum TaskStatus {
  TODO,
  INPROGRESS,
  INREVIEW,
  DONE,
}

export enum Priority {
  HIGHEST,
  HIGH,
  MEDIUM,
  LOW,
  LOWEST,
}
