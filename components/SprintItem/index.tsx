import {
  FlatList,
  LayoutAnimation,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  Touchable,
  View,
} from "react-native";
import React, { useCallback, useContext, useRef, useState } from "react";
import TextView from "../../components/TextView";
import { FlexColumn, FlexRowCenter } from "../../components/View";
import { Sprint, SprintStatus } from "../../models/sprint";
import TaskItem from "../../components/TaskItem";
import { Task } from "../../models/task";
import MenuIcon from "../../assets/svg/menu_icon.svg";
import Popover, {
  PopoverMode,
  PopoverPlacement,
} from "react-native-popover-view";
import { AuthContext } from "../../context/authContext";
import { ProjectContext } from "../../context/projectContext";
import CreateSprint from "../../modules/home/components/CreateSprint";
import { TouchableOpacity } from "react-native-gesture-handler";

const SprintItem = ({
  props,
  callbackEditSprint,
}: {
  props: Sprint;
  callbackEditSprint: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const { user } = useContext(AuthContext);
  const { project, updateSprint, deleteSprint } = useContext(ProjectContext);
  const toggleOpen = () => {
    setIsOpen((value) => !value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  const ref = useRef<TouchableOpacity>(null);

  const renderTask = ({ item }: { item: Task }) => {
    return <TaskItem props={item} />;
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
        <TouchableOpacity
          style={{ display: "none" }}
          ref={ref}
          onPress={() => callbackEditSprint()}
        />
        <Popover
          placement={PopoverPlacement.BOTTOM}
          isVisible={showPopover}
          from={
            <Pressable onPress={() => setShowPopover(true)}>
              <MenuIcon width={24} height={24} fill="white" />
            </Pressable>
          }
          backgroundStyle={{ backgroundColor: "transparent" }}
          popoverStyle={{
            backgroundColor: "#3a3b3c",
            flex: 1,
          }}
          onRequestClose={() => setShowPopover(false)}
        >
          {(props.status === SprintStatus.INACTIVE ||
            props.status === SprintStatus.ACTIVE) && (
            <Pressable
              style={{
                borderBottomWidth: 1,
                borderColor: "rgba(255,255,255,0.6)",
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
              onPress={() => {
                updateSprintStatus();
                setShowPopover(false);
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
                    : props.status === SprintStatus.ACTIVE && "Complete Sprint"
                }`}
              </TextView>
            </Pressable>
          )}

          <Pressable
            style={{
              borderBottomWidth: 1,
              borderColor: "rgba(255,255,255,0.6)",
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
            onPress={() => {
              setShowPopover(false);
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
          </Pressable>
          <Pressable
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              backgroundColor: "#D54040",
            }}
            onPress={() => {
              setShowPopover(false);
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
          </Pressable>
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
          data={props.tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
        />
      </View>
    </FlexColumn>
  );
};

export default SprintItem;
