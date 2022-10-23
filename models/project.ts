import { mockListSprint, Sprint } from "./sprint";
import uuid from "react-native-uuid";
export type Project = {
  id: string;
  sprints: Sprint[];
  status: ProjectStatus;
  title: string;
};

export enum ProjectStatus {
  PLANNING = "PLANNING",
  INPROGRESS = "INPROGRESS",
  DONE = "DONE",
}
export const mockListProject: Project[] = [
  {
    id: uuid.v4().toString(),
    sprints: mockListSprint,
    status: ProjectStatus.INPROGRESS,
    title: "test1",
  },
  {
    id: uuid.v4().toString(),
    sprints: mockListSprint,
    status: ProjectStatus.INPROGRESS,
    title: "test2",
  },
  {
    id: uuid.v4().toString(),
    sprints: mockListSprint,
    status: ProjectStatus.INPROGRESS,
    title: "test3",
  },
  {
    id: uuid.v4().toString(),
    sprints: mockListSprint,
    status: ProjectStatus.INPROGRESS,
    title: "test4",
  },
];
