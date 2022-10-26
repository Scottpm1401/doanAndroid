import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import TextView from "../TextView";
import { Priority, TaskStatus } from "../../models/task";
import { Flex, Button } from "native-base";
import EqualIcon from "../../assets/svg/equal_icon.svg";
import DownArrowIcon from "../../assets/svg/down-arrow.svg";
import ArrowUpIcon from "../../assets/svg/up_arrow.svg";
import ArrowDoubleIcon from "../../assets/svg/doubleUp.svg";
import DoubleDown from "../../assets/svg/doubleDown.svg";

type Props = {
  priority: Priority;
  iconSize?: number;
};

const TaskPriorityItem = ({ priority, iconSize = 16 }: Props) => {
  const renderIcon = () => {
    switch (priority) {
      case Priority.MEDIUM:
        {
          return (
            <EqualIcon
              style={{ width: iconSize, height: iconSize, fill: "yellow" }}
            />
          );
        }
        break;
      case Priority.HIGHEST:
        {
          return (
            <ArrowDoubleIcon
              style={{ width: iconSize, height: iconSize, fill: "white" }}
            />
          );
        }
        break;
      case Priority.LOW:
        {
          return (
            <DownArrowIcon
              style={{ width: iconSize, height: iconSize, fill: "#0a32c2" }}
            />
          );
        }
        break;
      case Priority.LOWEST:
        {
          return (
            <DoubleDown
              style={{
                width: iconSize,
                height: iconSize,
                fill: "blue",
                transform: [{ rotate: "180deg" }],
              }}
            />
          );
        }
        break;
      case Priority.HIGH: {
        return (
          <ArrowUpIcon
            style={{ width: iconSize, height: iconSize, fill: "#ff2a00" }}
          />
        );
      }
    }
  };
  return (
    <Button variant="unstyled" disabled={true} padding="0">
      {renderIcon()}
    </Button>
  );
};

export default TaskPriorityItem;
