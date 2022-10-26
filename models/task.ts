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
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: TaskStatus.DONE,
    priority: Priority.HIGHEST,
  },

  {
    id: uuid.v4().toString(),
    title: "Hieudeptrai",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: TaskStatus.INPROGRESS,
    priority: Priority.LOW,
  },

  {
    id: uuid.v4().toString(),
    title: "Hieudeptrai222",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    status: TaskStatus.INREVIEW,
    priority: Priority.MEDIUM,
  },
  {
    id: uuid.v4().toString(),
    title: "Hieudeptrai222",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    status: TaskStatus.INREVIEW,
    priority: Priority.LOWEST,
  },
];
