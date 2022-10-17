import {
  FlatList,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import TextView from "../../components/TextView";
import { FlexColumn } from "../../components/View";
import { Sprint } from "../../models/sprint";
import TaskItem from "../../components/TaskItem";
import { Task } from "../../models/task";

const SprintItem = ({ props }: { props: Sprint }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((value) => !value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const renderTask = ({ item }: { item: Task }) => {
    return <TaskItem props={item} />;
  };

  return (
    <FlexColumn>
      <Pressable onPress={() => toggleOpen()}>
        <TextView style={{ color: "white" }} size="text_14">
          {props.title}
        </TextView>
      </Pressable>

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
          contentContainerStyle={{}}
          data={props.tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
        />
      </View>
    </FlexColumn>
  );
};

export default SprintItem;
