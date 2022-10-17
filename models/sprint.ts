import { mockListTask, Task } from "./task";
import uuid from "react-native-uuid";
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

export const mockListSprint: Sprint[] = [
  {
    id: uuid.v4().toString(),
    tasks: mockListTask,
    status: SprintStatus.ACTIVE,
    title: "test1",
  },
  {
    id: uuid.v4().toString(),
    tasks: mockListTask,
    status: SprintStatus.ACTIVE,
    title: "test2",
  },
];
