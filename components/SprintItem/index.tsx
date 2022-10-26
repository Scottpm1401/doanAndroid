import { FlatList, LayoutAnimation, Pressable, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import TextView from "../../components/TextView";
import { FlexColumn, FlexRowCenter } from "../../components/View";
import { Sprint, SprintStatus } from "../../models/sprint";
import TaskItem from "../../components/TaskItem";
import { Task } from "../../models/task";
import MenuIcon from "../../assets/svg/menu_icon.svg";
import { AuthContext } from "../../context/authContext";
import { ProjectContext } from "../../context/projectContext";
import { Popover, Button } from "native-base";
import CreateTask from "../../modules/home/components/CreateTask";

const SprintItem = ({
  props,
  callbackEditSprint,
}: {
  props: Sprint;
  callbackEditSprint: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateTask, setIsCreateTask] = useState(false);
  const { user } = useContext(AuthContext);
  const { project, updateSprint, deleteSprint, setSprintId } =
    useContext(ProjectContext);
  const toggleOpen = () => {
    setIsOpen((value) => !value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const renderTask = ({ item }: { item: Task }) => {
    return <TaskItem props={item} sprintId={props.id} />;
  };

  const updateSprintStatus = () => {
    const newStatus: SprintStatus =
      props.status === SprintStatus.INACTIVE
        ? SprintStatus.ACTIVE
        : props.status === SprintStatus.ACTIVE
        ? SprintStatus.DONE
        : SprintStatus.DONE;
    const newSprint: Sprint = {
      ...props,
      status: newStatus,
    };

    updateSprint(newSprint);
  };

  return (
    <FlexColumn>
      <FlexRowCenter style={{ justifyContent: "space-between" }}>
        <Pressable onPress={() => toggleOpen()}>
          <TextView style={{ color: "white" }} size="text_16" fontWeight="bold">
            {`${props.title} (${props.status})`}
          </TextView>
        </Pressable>
        <Popover
          trigger={(triggerProps: JSX.IntrinsicAttributes) => (
            <Button {...triggerProps} variant="unstyled">
              <MenuIcon width={24} height={24} fill="white" />
            </Button>
          )}
        >
          <Popover.Content w={48} bgColor="gray.600">
            {(props.status === SprintStatus.INACTIVE ||
              props.status === SprintStatus.ACTIVE) && (
              <Button
                style={{
                  borderBottomWidth: 1,
                  borderColor: "rgba(255,255,255,0.6)",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
                colorScheme="coolGray"
                onPress={() => {
                  updateSprintStatus();
                }}
              >
                <TextView
                  size="text_13"
                  style={{ color: "white" }}
                  fontWeight="bold"
                >
                  {`${
                    props.status === SprintStatus.INACTIVE
                      ? "Active Sprint"
                      : props.status === SprintStatus.ACTIVE &&
                        "Complete Sprint"
                  }`}
                </TextView>
              </Button>
            )}

            <Button
              style={{
                borderBottomWidth: 1,
                borderColor: "rgba(255,255,255,0.6)",
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              colorScheme="coolGray"
              onPress={() => {
                callbackEditSprint();
              }}
            >
              <TextView
                size="text_13"
                style={{ color: "white" }}
                fontWeight="bold"
              >
                Edit Sprint
              </TextView>
            </Button>

            <Button
              style={{
                borderBottomWidth: 1,
                borderColor: "rgba(255,255,255,0.6)",
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              colorScheme="coolGray"
              onPress={() => {
                setIsCreateTask(true);
                setSprintId(props.id);
              }}
            >
              <TextView
                size="text_13"
                style={{ color: "white" }}
                fontWeight="bold"
              >
                Add New Task
              </TextView>
            </Button>

            <Button
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              colorScheme="error"
              onPress={() => {
                deleteSprint(props);
              }}
            >
              <TextView
                size="text_13"
                style={{ color: "white" }}
                fontWeight="bold"
              >
                Delete Sprint
              </TextView>
            </Button>
          </Popover.Content>
        </Popover>
      </FlexRowCenter>

      <View
        style={{
          alignItems: "flex-start",
          borderWidth: 3,
          marginTop: 8,
          paddingLeft: 10,
          overflow: "hidden",
          height: isOpen ? "auto" : 0,
        }}
      >
        <FlatList
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "flex-start",
          }}
          data={props.tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
        />
      </View>
      <CreateTask
        isOpen={isCreateTask}
        setIsOpen={() => setIsCreateTask(false)}
      />
    </FlexColumn>
  );
};

export default SprintItem;
