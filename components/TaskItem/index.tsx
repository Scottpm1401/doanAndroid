import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextView from "../../components/TextView";
import { FlexColumn, FlexRowCenter } from "../../components/View";
import { Priority, Task } from "../../models/task";
import EqualIcon from "../../assets/svg/equal_icon.svg";
import DownArrowIcon from "../../assets/svg/down-arrow.svg";
import ArrowUpIcon from "../../assets/svg/up_arrow.svg";
import ArrowDoubleIcon from "../../assets/svg/doubleUp.svg";
import DoubleDown from "../../assets/svg/doubleDown.svg";
const TaskItem = ({ props }: { props: Task }) => {
  const renderIcon = (priority: Priority) => {
    switch (priority) {
      case Priority.MEDIUM:
        {
          return (
            <EqualIcon style={{ width: 16, height: 16, fill: "yellow" }} />
          );
        }
        break;
      case Priority.HIGHEST:
        {
          return (
            <ArrowDoubleIcon style={{ width: 10, height: 10, fill: "white" }} />
          );
        }
        break;
      case Priority.LOW:
        {
          return (
            <DownArrowIcon style={{ width: 10, height: 10, fill: "#0a32c2" }} />
          );
        }
        break;
      case Priority.LOWEST:
        {
          return (
            <DoubleDown
              style={{
                width: 10,
                height: 10,
                fill: "blue",
                transform: [{ rotate: "180deg" }],
              }}
            />
          );
        }
        break;
    }
  };

  return (
    <FlexColumn>
      <TextView style={{ color: "white" }} size={"text_20"}>
        {props.title}
      </TextView>
      <FlexRowCenter>
        <FlexRowCenter
          style={{
            marginRight: 8,
            borderRadius: 4,
            backgroundColor: "white",
          }}
        >
          <TextView
            style={{
              padding: 5,
              color: "green",
              fontWeight: "700",
            }}
            size={"text_11"}
          >
            {props.status.toUpperCase()}
          </TextView>
        </FlexRowCenter>

        {renderIcon(props.priority)}
      </FlexRowCenter>
    </FlexColumn>
  );
};

export default TaskItem;
