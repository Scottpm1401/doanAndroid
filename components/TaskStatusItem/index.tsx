import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import TextView from "../TextView";
import { TaskStatus } from "../../models/task";
import { Flex, Button } from "native-base";

type Props = {
  status: TaskStatus;
  padding?: number;
};

const TaskStatusItem = (props: Props) => {
  return (
    <Button
      colorScheme={
        props.status === TaskStatus.TODO
          ? "gray"
          : props.status === TaskStatus.INPROGRESS
          ? "primary"
          : props.status === TaskStatus.INREVIEW
          ? "darkBlue"
          : "teal"
      }
      padding={props.padding || 0}
      disabled={true}
    >
      <TextView
        style={{
          padding: 5,
          color: "white",
          fontWeight: "700",
        }}
        size={"text_13"}
        fontWeight="bold"
      >
        {props.status.toUpperCase()}
      </TextView>
    </Button>
  );
};

export default TaskStatusItem;
