import { FlatList, Pressable } from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FlexRowCenter, FlexColumn } from "../../components/View";
import TextView from "../../components/TextView";

import { mockListSprint, Sprint } from "../../models/sprint";
import SprintItem from "../../components/SprintItem";
import CreateProject from "./components/CreateProject";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { AuthContext } from "../../context/authContext";
import { mockListProject, Project } from "../../models/project";
import CheckIcon from "../../assets/svg/check_icon.svg";
import CreateSprint from "./components/CreateSprint";
import { ProjectContext } from "../../context/projectContext";
import { Button, Avatar } from "native-base";
type Props = {};

const Home = (props: Props) => {
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isSprintOpen, setIsSprintOpen] = useState(false);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "90%"], []);
  const { user } = useContext(AuthContext);
  const { project, setProject } = useContext(ProjectContext);
  const [sprint, setSprint] = useState<Sprint | undefined>(undefined);

  const renderSprint = ({ item }: { item: Sprint }) => {
    return (
      <SprintItem
        props={item}
        callbackEditSprint={() => {
          setIsSprintOpen(true);
          setSprint(item);
        }}
      />
    );
  };

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = () => sheetRef.current?.close();

  const changeProject = useCallback(
    (item: Project) => {
      if (project?.id !== item.id) {
        setProject(item);
        handleClosePress();
      }
    },
    [project]
  );
  useEffect(() => {
    if (user)
      if (user.projects.length === 0) {
        setIsProjectOpen(true);
      } else {
        setProject(user.projects[0]);
      }
  }, []);

  const renderProject = ({ item }: { item: Project }) => {
    return (
      <Pressable
        style={{
          borderBottomWidth: 1,
          paddingVertical: 8,
          borderColor: "rgba(255,255,255,0.6)",
        }}
        onPress={() => changeProject(item)}
      >
        <FlexRowCenter>
          <TextView style={{ marginRight: 8, color: "white" }} size="text_16">
            {item.title}
          </TextView>
          <TextView style={{ marginRight: 8, color: "white" }} size="text_14">
            {item.status}
          </TextView>
          {project?.id === item.id && (
            <CheckIcon width={16} height={16} fill="green" />
          )}
        </FlexRowCenter>
      </Pressable>
    );
  };

  return (
    <FlexColumn
      style={{
        backgroundColor: "black",
        height: "100%",
        width: "100%",
      }}
    >
      <FlexRowCenter style={{ justifyContent: "space-between", marginTop: 8 }}>
        <Avatar
          size="sm"
          source={{
            uri:
              user?.avatar ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
          }}
        />
        <Button padding="1" onPress={() => handleSnapPress(0)}>
          <TextView size="text_16" style={{ color: "white" }} fontWeight="bold">
            {`PROJECT: ${project?.title}`}
          </TextView>
        </Button>

        <Button padding="1" onPress={() => setIsSprintOpen(true)}>
          <TextView style={{ color: "white" }} size="text_16" fontWeight="bold">
            Create Sprint
          </TextView>
        </Button>
      </FlexRowCenter>
      <FlexColumn>
        {project && (
          <FlexColumn style={{ paddingRight: 8 }}>
            <FlatList
              data={project?.sprints}
              renderItem={renderSprint}
              keyExtractor={(item) => item.id}
            />
          </FlexColumn>
        )}
      </FlexColumn>
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose
        animateOnMount
        backgroundStyle={{ backgroundColor: "rgba(30,41,59,1)" }}
      >
        <FlexColumn style={{ paddingHorizontal: 8 }}>
          <FlexRowCenter style={{ justifyContent: "space-between" }}>
            <TextView
              style={{ color: "white" }}
              size="text_16"
              fontWeight="bold"
            >
              Your Project
            </TextView>
            <Pressable
              onPress={() => {
                setIsProjectOpen(true);
                handleClosePress();
              }}
            >
              <TextView
                style={{ color: "white" }}
                size="text_16"
                fontWeight="bold"
              >
                New Project
              </TextView>
            </Pressable>
          </FlexRowCenter>

          <FlatList
            data={user?.projects}
            renderItem={renderProject}
            keyExtractor={(item) => item.id}
          />
        </FlexColumn>
      </BottomSheet>
      <CreateProject
        setIsOpen={() => setIsProjectOpen(false)}
        isOpen={isProjectOpen}
      />
      <CreateSprint
        setIsOpen={() => {
          setIsSprintOpen(false);
          setSprint(undefined);
        }}
        isOpen={isSprintOpen}
        sprint={sprint}
      />
    </FlexColumn>
  );
};

export default Home;
