import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlexRowCenter } from "../../../components/View";
import TaskStatusItem from "../../../components/TaskStatusItem";
import TextView from "../../../components/TextView";
import { Button } from "native-base";
import ArrowRight from "../../../assets/svg/arrow_right_icon.svg";
import { TaskStatus } from "../../../models/task";

type TaskTransitionType = {
  status: TaskStatus;
  callback?: () => void;
};

const TaskTransitionItem = ({ status, callback }: TaskTransitionType) => {
  return (
    <Button
      style={{
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "gray",
        justifyContent: "flex-start",
      }}
      variant="ghost"
      colorScheme="gray"
      onPress={() => callback?.()}
    >
      <FlexRowCenter
        style={{
          paddingVertical: 8,
          width: "100%",
        }}
      >
        <TextView
          size="text_16"
          fontWeight="bold"
          style={{ marginRight: 16, color: "white" }}
        >
          Transition to
        </TextView>
        <ArrowRight
          width={30}
          height={18}
          fill="white"
          style={{ marginRight: 16 }}
        />
        <TaskStatusItem status={status} />
      </FlexRowCenter>
    </Button>
  );
};

export default TaskTransitionItem;

const styles = StyleSheet.create({});
