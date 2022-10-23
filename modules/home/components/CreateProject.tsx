import { View, Text, TextInput, Pressable } from "react-native";
import React, { useContext } from "react";
import DefaultModal from "../../../components/DefaultModal";
import { FlexColumn, FlexRowCenter } from "../../../components/View";
import TextView from "../../../components/TextView";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../../context/authContext";
import { Project, ProjectStatus } from "../../../models/project";
import uuid from "react-native-uuid";
import { ProjectContext } from "../../../context/projectContext";

type CreateProjectType = {
  isOpen: boolean;
  setIsOpen: () => void;
};

type ProjectType = {
  projectName: string;
};

const CreateProject = ({ isOpen, setIsOpen }: CreateProjectType) => {
  const ProjectSchema = Yup.object().shape({
    projectName: Yup.string().required("Required"),
  });
  const { user, setUser } = useContext(AuthContext);
  const { setProject, addProject } = useContext(ProjectContext);
  const createProject = (values: ProjectType) => {
    const findProject = user?.projects.find(
      (project) => project.title === values.projectName
    );
    if (!!!findProject) {
      const newProject: Project = {
        id: uuid.v4().toString(),
        sprints: [],
        status: ProjectStatus.PLANNING,
        title: values.projectName,
      };
      addProject(newProject);
      setIsOpen();
    }
  };

  return (
    <DefaultModal
      isModalOpen={isOpen}
      setIsModalOpen={setIsOpen}
      isHiddenLogo
      style={{
        backgroundColor: "black",
      }}
      bodyStyle={{ flex: 1 }}
      isHiddenIcon={user && user?.projects.length === 0}
    >
      <FlexRowCenter style={{ justifyContent: "center" }}>
        <TextView size="text_13" style={{ color: "white", fontWeight: "bold" }}>
          Create Project
        </TextView>
      </FlexRowCenter>
      <Formik
        initialValues={{ projectName: "" } as ProjectType}
        onSubmit={createProject}
        validationSchema={ProjectSchema}
      >
        {({ handleChange, handleSubmit, errors, values, touched }) => (
          <FlexColumn style={{ marginTop: 32 }}>
            <TextView size={"text_15"} style={{ color: "white" }}>
              Project Name
            </TextView>
            <TextInput
              style={{
                color: "white",
                marginTop: 8,
                borderColor: "rgba(255,255,255,0.4)",
                paddingBottom: 4,
                borderBottomWidth: 2,
              }}
              placeholderTextColor="rgba(255,255,255,0.6)"
              placeholder="Enter project name"
              onChangeText={handleChange("projectName")}
            />

            <Pressable
              style={{
                display: "flex",
                flexDirection: "row",
                borderRadius: 8,
                backgroundColor: "#4664cf",
                padding: 8,
                marginTop: 16,
                justifyContent: "center",
              }}
              onPress={() => handleSubmit()}
            >
              <TextView
                size="text_16"
                fontWeight="bold"
                style={{ color: "white" }}
              >
                Create
              </TextView>
            </Pressable>
          </FlexColumn>
        )}
      </Formik>
    </DefaultModal>
  );
};

export default CreateProject;
