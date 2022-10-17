import { TouchableHighlight } from "react-native";
import uuid from "react-native-uuid";
export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
};

export enum TaskStatus {
  TODO = "Todo",
  INPROGRESS = "Inprogress",
  INREVIEW = "Inreview",
  DONE = "Done",
}

export enum Priority {
  HIGHEST = "Highest",
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
  LOWEST = "Lowest",
}

export const mockListTask: Task[] = [
  {
    id: uuid.v4().toString(),
    title: "User cuuren",
    description: "nhattraidat",
    status: TaskStatus.DONE,
    priority: Priority.HIGHEST,
  },

  {
    id: uuid.v4().toString(),
    title: "Hieudeptrai",
    description: "nhattraidat",
    status: TaskStatus.INPROGRESS,
    priority: Priority.LOW,
  },

  {
    id: uuid.v4().toString(),
    title: "Hieudeptrai222",
    description: "nhattraidat",
    status: TaskStatus.INREVIEW,
    priority: Priority.MEDIUM,
  },
  {
    id: uuid.v4().toString(),
    title: "Hieudeptrai222",
    description: "nhattraidat",
    status: TaskStatus.INREVIEW,
    priority: Priority.LOWEST,
  },
];
