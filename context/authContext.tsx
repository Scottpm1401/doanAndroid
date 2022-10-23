import { User, userlist } from "../models/user";
import React, { useState, createContext } from "react";
import { Project } from "../models/project";

type UserType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  updateUserProjects: (projects: Project[]) => void;
  updateUserSingleProject: (project: Project) => void;
};

export const AuthContext = createContext<UserType>();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [users, setUsers] = useState<User[]>(userlist);
  const updateUserProjects = (projects: Project[]) => {
    setUser((prevState) => {
      if (prevState) {
        return {
          ...prevState,
          projects,
        };
      } else return undefined;
    });
  };
  const updateUserSingleProject = (project: Project) => {
    if (user) {
      const newProjects = user?.projects.map((item) => {
        if (item.id === project.id) return project;
        else return item;
      });
      updateUserProjects(newProjects);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        users,
        setUsers,
        updateUserProjects,
        updateUserSingleProject,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
