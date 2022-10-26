import { FlexColumn, FlexRowCenter } from "../../components/View";
import { Priority, TaskStatus } from "../../models/task";

import { Button, Popover } from "native-base";
import IcClose from "../../assets/svg/ic_close.svg";
import { goBack } from "../../utils/navigation";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { ProjectContext } from "../../context/projectContext";
import ThreeDots from "../../assets/svg/three_dots_icon.svg";
import TextView from "../../components/TextView";
import BottomSheet from "@gorhom/bottom-sheet";

import TaskStatusItem from "../../components/TaskStatusItem";
import TaskPriorityItem from "../../components/TaskPriorityItem";
import PriorityTransitionItem from "./components/PriorityTransitionItem";
import TaskTransitionItem from "./components/TaskTransitionItem";
import CreateTask from "../../modules/home/components/CreateTask";

const Job = () => {
  const { task, setTask, setSprintId, updateTask, deleteTask } =
    useContext(ProjectContext);
  const [isCreateTask, setIsCreateTask] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);
  const sheetPriorityRef = useRef<BottomSheet>(null);
  const prioritySnapPoints = useMemo(() => ["50%"], []);
  const snapPoints = useMemo(() => ["40%"], []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = () => sheetRef.current?.close();

  const handlePrioritySnapPress = useCallback((index: number) => {
    sheetPriorityRef.current?.snapToIndex(index);
  }, []);

  const handlePriorityClosePress = () => sheetPriorityRef.current?.close();

  const handleChangeStatus = (status: TaskStatus) => {
    if (task) {
      const newTask = { ...task, status };
      updateTask(newTask);
    }
    handleClosePress();
  };

  const handleChangePriority = (priority: Priority) => {
    if (task) {
      const newTask = { ...task, priority };
      updateTask(newTask);
    }
    handlePriorityClosePress();
  };

  const handleGoBack = () => {
    goBack();
    setSprintId(undefined);
    setTask(undefined);
  };

  const handleDeleteTask = () => {
    if (task) {
      deleteTask(task);
      handleGoBack();
    }
  };

  return (
    <FlexColumn
      style={{
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        padding: 4,
      }}
    >
      <FlexRowCenter
        style={{ justifyContent: "space-between", paddingVertical: 8 }}
      >
        <Button variant="unstyled" padding="0" onPress={() => handleGoBack()}>
          <IcClose width={24} height={24} fill="white" />
        </Button>
        <Popover
          trigger={(triggerProps: JSX.IntrinsicAttributes) => (
            <Button {...triggerProps} variant="unstyled" padding="0">
              <ThreeDots width={24} height={24} fill="white" />
            </Button>
          )}
        >
          <Popover.Content w={32} bgColor="gray.600">
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
                setShowPopover(false);
              }}
            >
              <TextView
                size="text_13"
                style={{ color: "white" }}
                fontWeight="bold"
              >
                Edit Task
              </TextView>
            </Button>

            <Button
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              colorScheme="error"
              onPress={() => {
                setShowPopover(false);
                handleDeleteTask();
              }}
            >
              <TextView
                size="text_13"
                style={{ color: "white" }}
                fontWeight="bold"
              >
                Delete Task
              </TextView>
            </Button>
          </Popover.Content>
        </Popover>
      </FlexRowCenter>
      <FlexColumn>
        <TextView size="text_24" fontWeight="bold" style={{ color: "white" }}>
          {task?.title}
        </TextView>
        <FlexRowCenter style={{ marginTop: 16 }}>
          <Button
            variant="unstyled"
            padding="0"
            onPress={() => handleSnapPress(0)}
          >
            <TaskStatusItem
              status={task?.status || TaskStatus.TODO}
              padding={1}
            />
          </Button>
        </FlexRowCenter>
        <TextView
          style={{ color: "white", marginTop: 16, lineHeight: 28 }}
          size="text_18"
        >
          {task?.description}
        </TextView>
        <Button
          variant="ghost"
          colorScheme="gray"
          display="flex"
          justifyContent="flex-start"
          marginTop="1"
          onPress={() => handlePrioritySnapPress(0)}
        >
          <FlexColumn>
            <TextView style={{ color: "gray", marginBottom: 4 }} size="text_14">
              Priority
            </TextView>
            <FlexRowCenter>
              <TaskPriorityItem priority={task?.priority || Priority.LOWEST} />
              <TextView
                style={{ color: "white", marginLeft: 16 }}
                size="text_16"
              >
                {task?.priority}
              </TextView>
            </FlexRowCenter>
          </FlexColumn>
        </Button>
      </FlexColumn>

      <BottomSheet
        ref={sheetPriorityRef}
        snapPoints={prioritySnapPoints}
        index={-1}
        enablePanDownToClose
        animateOnMount
        backgroundStyle={{ backgroundColor: "rgba(30,41,59,1)" }}
      >
        <FlexColumn style={{ paddingHorizontal: 12 }}>
          <TextView size="text_18" fontWeight="bold" style={{ color: "white" }}>
            Priority
          </TextView>
          <PriorityTransitionItem
            priority={Priority.HIGHEST}
            callback={() => handleChangePriority(Priority.HIGHEST)}
          />
          <PriorityTransitionItem
            priority={Priority.HIGH}
            callback={() => handleChangePriority(Priority.HIGH)}
          />
          <PriorityTransitionItem
            priority={Priority.MEDIUM}
            callback={() => handleChangePriority(Priority.MEDIUM)}
          />
          <PriorityTransitionItem
            priority={Priority.LOW}
            callback={() => handleChangePriority(Priority.LOW)}
          />
          <PriorityTransitionItem
            priority={Priority.LOWEST}
            callback={() => handleChangePriority(Priority.LOWEST)}
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
          <TextView size="text_18" fontWeight="bold" style={{ color: "white" }}>
            Select a Transition
          </TextView>
          <TaskTransitionItem
            status={TaskStatus.TODO}
            callback={() => handleChangeStatus(TaskStatus.TODO)}
          />
          <TaskTransitionItem
            status={TaskStatus.INPROGRESS}
            callback={() => handleChangeStatus(TaskStatus.INPROGRESS)}
          />
          <TaskTransitionItem
            status={TaskStatus.INREVIEW}
            callback={() => handleChangeStatus(TaskStatus.INREVIEW)}
          />
          <TaskTransitionItem
            status={TaskStatus.DONE}
            callback={() => handleChangeStatus(TaskStatus.DONE)}
          />
        </FlexColumn>
      </BottomSheet>

      <CreateTask
        isOpen={isCreateTask}
        setIsOpen={() => setIsCreateTask(false)}
        task={task}
      />
    </FlexColumn>
  );
};

export default Job;
