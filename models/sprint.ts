import { Task } from './task';

export type Sprint = {
  id: string;
  tasks: Task[];
  status: SprintStatus;
  title: string;
};

export enum SprintStatus {
  ACTIVE,
  INACTIVE,
  DONE,
}
