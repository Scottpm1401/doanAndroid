import { Sprint } from './sprint';

export type Project = {
  id: string;
  sprints: Sprint[];
  status: ProjectStatus;
  title: string;
};

export enum ProjectStatus {
  PLANNING,
  INPROGRESS,
  DONE,
}
