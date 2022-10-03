import { Project } from './project';

export type User = {
  id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  password: string;
  avatar: string;
  projects: Project[];
};
