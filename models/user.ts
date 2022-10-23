import { mockListProject, Project } from "./project";
import uuid from "react-native-uuid";

export type User = {
  id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  password: string;
  avatar: string;
  projects: Project[];
  role: Role;
};

export enum Role {
  USER,
  ADMIN,
}

export const userlist: User[] = [
  {
    id: uuid.v4().toString(),
    displayName: "Hieu",
    email: "hieu@example.com",
    phoneNumber: " 123456789",
    dob: "31/01/2001",
    password: "123456",
    avatar: "",
    projects: [],
    role: Role.USER,
  },
  {
    id: uuid.v4().toString(),
    displayName: "Nhat",
    email: "Nhat@example.com",
    phoneNumber: " 123456789",
    dob: "31/01/2001",
    password: "1234",
    avatar: "",
    projects: mockListProject,
    role: Role.USER,
  },
];
