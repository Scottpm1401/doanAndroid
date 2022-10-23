import { View, Text, TextInput, Pressable } from "react-native";
import React, { useContext } from "react";
import DefaultModal from "../../../components/DefaultModal";
import { FlexColumn, FlexRowCenter } from "../../../components/View";
import TextView from "../../../components/TextView";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../../context/authContext";
import uuid from "react-native-uuid";
import { Sprint, SprintStatus } from "../../../models/sprint";
import { ProjectContext } from "../../../context/projectContext";

type CreateProjectType = {
  isOpen: boolean;
  setIsOpen: () => void;
  sprint?: Sprint;
};

type SprintType = {
  sprintName: string;
};

const CreateSprint = ({ isOpen, setIsOpen, sprint }: CreateProjectType) => {
  const { setUser, user } = useContext(AuthContext);
  const { setProject, project, addSprint, updateSprint } =
    useContext(ProjectContext);

  const SprintSchema = Yup.object().shape({
    sprintName: Yup.string().required("Required"),
  });

  const createSprint = (values: SprintType) => {
    const findSprint = project?.sprints.find(
      (project) => project.title === values.sprintName
    );
    if (!!!findSprint) {
      const newSprint: Sprint = {
        id: uuid.v4().toString(),
        tasks: [],
        status: SprintStatus.INACTIVE,
        title: values.sprintName,
      };

      addSprint(newSprint);

      setIsOpen();
    }
  };

  const updateSprintName = (values: SprintType) => {
    if (sprint) updateSprint({ ...sprint, title: values.sprintName });
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
    >
      <FlexRowCenter style={{ justifyContent: "center" }}>
        <TextView size="text_13" style={{ color: "white", fontWeight: "bold" }}>
          {sprint ? "Update Sprint" : "Create Sprint"}
        </TextView>
      </FlexRowCenter>
      <Formik
        initialValues={{ sprintName: sprint ? sprint.title : "" } as SprintType}
        onSubmit={sprint ? updateSprintName : createSprint}
        validationSchema={SprintSchema}
      >
        {({ handleChange, handleSubmit, errors, values, touched }) => (
          <FlexColumn style={{ marginTop: 32 }}>
            <TextView size={"text_15"} style={{ color: "white" }}>
              Sprint Name
            </TextView>
            <TextInput
              style={{
                color: "white",
                marginTop: 8,
                borderColor: "rgba(255,255,255,0.4)",
                paddingBottom: 4,
                borderBottomWidth: 2,
              }}
              value={values.sprintName}
              placeholderTextColor="rgba(255,255,255,0.6)"
              placeholder="Enter sprint name"
              onChangeText={handleChange("sprintName")}
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

export default CreateSprint;
