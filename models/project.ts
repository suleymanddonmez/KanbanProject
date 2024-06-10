import mongoose from "mongoose";
import { TaskListType } from "./taskList";

export interface ProjectDbType {
  _id: string;
  title: string;
  _v: string;
}

export interface ProjectType {
  id: string;
  key: string;
  title: string;
  items: TaskListType[];
}

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
