import { View, Text, TextInput, Pressable } from "react-native";
import React, { useCallback, useContext, useMemo, useRef } from "react";
import DefaultModal from "../../../components/DefaultModal";
import { FlexColumn, FlexRowCenter } from "../../../components/View";
import TextView from "../../../components/TextView";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../../context/authContext";
import uuid from "react-native-uuid";
import { Sprint, SprintStatus } from "../../../models/sprint";
import { ProjectContext } from "../../../context/projectContext";
import { Priority, Task, TaskStatus } from "../../../models/task";
import TaskTransitionItem from "../../../modules/job/components/TaskTransitionItem";
import BottomSheet from "@gorhom/bottom-sheet";
import PriorityTransitionItem from "../../../modules/job/components/PriorityTransitionItem";
import { Button } from "native-base";
import TaskPriorityItem from "../../../components/TaskPriorityItem";
import TaskStatusItem from "../../../components/TaskStatusItem";

type CreateProjectType = {
  isOpen: boolean;
  setIsOpen: () => void;
  task?: Task;
};

type CreateTaskType = {
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
};

const CreateTask = ({ isOpen, setIsOpen, task }: CreateProjectType) => {
  const { addTask, setSprintId, updateTask } = useContext(ProjectContext);

  const sheetRef = useRef<BottomSheet>(null);
  const sheetPriorityRef = useRef<BottomSheet>(null);
  const prioritySnapPoints = useMemo(() => ["55%"], []);
  const snapPoints = useMemo(() => ["50%"], []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = () => sheetRef.current?.close();

  const handlePrioritySnapPress = useCallback((index: number) => {
    sheetPriorityRef.current?.snapToIndex(index);
  }, []);

  const handlePriorityClosePress = () => sheetPriorityRef.current?.close();

  const SprintSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const createTask = (values: CreateTaskType) => {
    const newTask: Task = {
      id: uuid.v4().toString(),
      title: values.title,
      priority: values.priority,
      status: values.status,
      description: values.description,
    };

    addTask(newTask);
    setSprintId(undefined);
    setIsOpen();
  };

  const handleUpdateTask = (values: CreateTaskType) => {
    if (task) {
      const newTask: Task = {
        id: task.id,
        title: values.title,
        priority: values.priority,
        status: values.status,
        description: values.description,
      };
      updateTask(newTask);
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
    >
      <FlexRowCenter style={{ justifyContent: "center" }}>
        <TextView size="text_13" style={{ color: "white", fontWeight: "bold" }}>
          {task ? "Update Task" : "Create Task"}
        </TextView>
      </FlexRowCenter>
      <Formik
        initialValues={
          task
            ? task
            : ({
                title: "",
                description: "",
                priority: Priority.MEDIUM,
                status: TaskStatus.TODO,
              } as CreateTaskType)
        }
        onSubmit={task ? handleUpdateTask : createTask}
        validationSchema={SprintSchema}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          errors,
          values,
          touched,
        }) => (
          <FlexColumn
            style={{
              marginTop: 32,

              height: 700,
            }}
          >
            <FlexColumn>
              <TextView size={"text_15"} style={{ color: "white" }}>
                Task name
              </TextView>
              <TextInput
                style={{
                  color: "white",
                  marginTop: 8,
                  borderColor: "rgba(255,255,255,0.4)",
                  paddingBottom: 4,
                  borderBottomWidth: 2,
                }}
                value={values.title}
                placeholderTextColor="rgba(255,255,255,0.6)"
                placeholder="Enter task name"
                onChangeText={handleChange("title")}
              />
            </FlexColumn>

            <FlexRowCenter style={{ marginVertical: 16 }}>
              <Button
                variant="unstyled"
                padding="0"
                onPress={() => handleSnapPress(0)}
              >
                <TaskStatusItem status={values.status} padding={1} />
              </Button>
            </FlexRowCenter>

            <FlexColumn>
              <TextView size={"text_15"} style={{ color: "white" }}>
                Description
              </TextView>
              <TextInput
                style={{
                  color: "white",
                  marginTop: 8,
                  borderColor: "rgba(255,255,255,0.4)",
                  paddingBottom: 4,
                  borderBottomWidth: 2,
                }}
                value={values.description}
                placeholderTextColor="rgba(255,255,255,0.6)"
                placeholder="Enter description"
                onChangeText={handleChange("description")}
              />
            </FlexColumn>

            <Button
              variant="ghost"
              colorScheme="gray"
              display="flex"
              justifyContent="flex-start"
              marginTop="1"
              onPress={() => handlePrioritySnapPress(0)}
            >
              <FlexColumn>
                <TextView
                  style={{ color: "gray", marginBottom: 4 }}
                  size="text_14"
                >
                  Priority
                </TextView>
                <FlexRowCenter>
                  <TaskPriorityItem priority={values.priority} />
                  <TextView
                    style={{ color: "white", marginLeft: 16 }}
                    size="text_16"
                  >
                    {values.priority}
                  </TextView>
                </FlexRowCenter>
              </FlexColumn>
            </Button>

            <BottomSheet
              ref={sheetPriorityRef}
              snapPoints={prioritySnapPoints}
              index={-1}
              enablePanDownToClose
              animateOnMount
              backgroundStyle={{ backgroundColor: "rgba(30,41,59,1)" }}
            >
              <FlexColumn style={{ paddingHorizontal: 12 }}>
                <TextView
                  size="text_18"
                  fontWeight="bold"
                  style={{ color: "white" }}
                >
                  Priority
                </TextView>
                <PriorityTransitionItem
                  priority={Priority.HIGHEST}
                  callback={() => {
                    setFieldValue("priority", Priority.HIGHEST);
                    handlePriorityClosePress();
                  }}
                />
                <PriorityTransitionItem
                  priority={Priority.HIGH}
                  callback={() => {
                    setFieldValue("priority", Priority.HIGH);
                    handlePriorityClosePress();
                  }}
                />
                <PriorityTransitionItem
                  priority={Priority.MEDIUM}
                  callback={() => {
                    setFieldValue("priority", Priority.MEDIUM);
                    handlePriorityClosePress();
                  }}
                />
                <PriorityTransitionItem
                  priority={Priority.LOW}
                  callback={() => {
                    setFieldValue("priority", Priority.LOW);
                    handlePriorityClosePress();
                  }}
                />
                <PriorityTransitionItem
                  priority={Priority.LOWEST}
                  callback={() => setFieldValue("priority", Priority.LOWEST)}
                />
              </FlexColumn>
            </BottomSheet>

            <BottomSheet
              ref={sheetRef}
              snapPoints={snapPoints}
              index={-1}
              enablePanDownToClose
              animateOnMount
              backgroundStyle={{ backgroundColor: "rgba(30,41,59,1)" }}
            >
              <FlexColumn style={{ paddingHorizontal: 12 }}>
                <TextView
                  size="text_18"
                  fontWeight="bold"
                  style={{ color: "white" }}
                >
                  Select a Transition
                </TextView>
                <TaskTransitionItem
                  status={TaskStatus.TODO}
                  callback={() => {
                    setFieldValue("status", TaskStatus.TODO);
                    handleClosePress();
                  }}
                />
                <TaskTransitionItem
                  status={TaskStatus.INPROGRESS}
                  callback={() => {
                    setFieldValue("status", TaskStatus.INPROGRESS);
                    handleClosePress();
                  }}
                />
                <TaskTransitionItem
                  status={TaskStatus.INREVIEW}
                  callback={() => {
                    setFieldValue("status", TaskStatus.INREVIEW);
                    handleClosePress();
                  }}
                />
                <TaskTransitionItem
                  status={TaskStatus.DONE}
                  callback={() => {
                    setFieldValue("status", TaskStatus.DONE);
                    handleClosePress();
                  }}
                />
              </FlexColumn>
            </BottomSheet>

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
                {task ? "Update" : "Create"}
              </TextView>
            </Pressable>
          </FlexColumn>
        )}
      </Formik>
    </DefaultModal>
  );
};

export default CreateTask;
