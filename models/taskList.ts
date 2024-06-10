import mongoose from "mongoose";
import { TaskType } from "./task";

export interface TaskListDbType {
  _id: string;
  title: string;
  projectId: string;
  _v: string;
}

export interface TaskListType {
  id: string;
  key: string;
  title: string;
  projectId: string;
  items?: TaskType[];
}

const taskListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
});

const TaskList = mongoose.models.TaskList || mongoose.model("TaskList", taskListSchema);

export default TaskList;
