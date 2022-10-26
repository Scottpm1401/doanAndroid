import React, { useContext } from "react";
import TextView from "../../components/TextView";
import { FlexRowCenter } from "../../components/View";
import { Task } from "../../models/task";
import { Button } from "native-base";
import { navigate } from "../../utils/navigation";
import { ProjectContext } from "../../context/projectContext";
import TaskStatusItem from "../../components/TaskStatusItem";
import TaskPriorityItem from "../../components/TaskPriorityItem";

const TaskItem = ({ props, sprintId }: { props: Task; sprintId: string }) => {
  const { setTask, setSprintId } = useContext(ProjectContext);

  const handleNavigateJob = () => {
    setTask(props);
    setSprintId(sprintId);
    navigate("job");
  };

  return (
    <Button
      variant="unstyled"
      onPress={() => handleNavigateJob()}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      marginBottom={4}
      padding="0"
    >
      <TextView style={{ color: "white" }} size={"text_20"}>
        {props.title}
      </TextView>
      <FlexRowCenter style={{ marginTop: 4 }}>
        <FlexRowCenter
          style={{
            marginRight: 16,
          }}
        >
          <TaskStatusItem status={props.status} />
        </FlexRowCenter>

        <TaskPriorityItem priority={props.priority} />
      </FlexRowCenter>
    </Button>
  );
};

export default TaskItem;
