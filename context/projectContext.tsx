import { Sprint } from "../models/sprint";
import React, { useState, createContext, useContext } from "react";
import { Project } from "../models/project";
import { AuthContext } from "./authContext";

type ProjectContextType = {
  project: Project | undefined;
  setProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
  addProject: (item: Project) => void;
  addSprint: (item: Sprint) => void;
  updateSprint: (sprint: Sprint) => void;
  deleteSprint: (sprint: Sprint) => void;
};

export const ProjectContext = createContext<ProjectContextType>();

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [project, setProject] = useState<Project | undefined>(undefined);
  const { user, setUser, updateUserProjects, updateUserSingleProject } =
    useContext(AuthContext);

  const addProject = (item: Project) => {
    setProject(item);
    setUser((prevState) => {
      if (prevState)
        return {
          ...prevState,
          projects: [...prevState.projects, item],
        };
      else return undefined;
    });
  };

  const addSprint = (sprint: Sprint) => {
    setProject((prevState) => {
      if (prevState)
        return {
          ...prevState,
          sprints: [...prevState.sprints, sprint],
        };
      else return undefined;
    });
    if (user) {
      const newProjects = user.projects.map((item) => {
        if (project && item.id === project.id) {
          return { ...item, sprints: [...item.sprints, sprint] };
        } else return item;
      });

      updateUserProjects(newProjects);
    }
  };

  const updateSprint = (sprint: Sprint) => {
    if (project) {
      const newSprints = project.sprints.map((item) => {
        if (item.id === sprint.id) {
          return sprint;
        } else return item;
      });
      const newProjects: Project = { ...project, sprints: newSprints || [] };
      setProject(newProjects);
      updateUserSingleProject(newProjects);
    }
  };

  const deleteSprint = (sprint: Sprint) => {
    if (project) {
      const newSprints = project.sprints.filter(
        (item) => item.id !== sprint.id
      );
      const newProjects: Project = { ...project, sprints: newSprints || [] };
      setProject(newProjects);
      updateUserSingleProject(newProjects);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        addProject,
        addSprint,
        updateSprint,
        deleteSprint,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
