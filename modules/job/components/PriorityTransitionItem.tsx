import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Priority } from "../../../models/task";
import { Button } from "native-base";
import { FlexRowCenter } from "../../../components/View";
import TaskPriorityItem from "../../../components/TaskPriorityItem";
import TextView from "../../../components/TextView";

type PriorityTransitionType = {
  priority: Priority;
  callback?: () => void;
};

const PriorityTransitionItem = ({
  priority,
  callback,
}: PriorityTransitionType) => {
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
        <TaskPriorityItem priority={priority} />
        <TextView
          size="text_16"
          fontWeight="bold"
          style={{ marginLeft: 16, color: "white" }}
        >
          {priority}
        </TextView>
      </FlexRowCenter>
    </Button>
  );
};

export default PriorityTransitionItem;

const styles = StyleSheet.create({});
