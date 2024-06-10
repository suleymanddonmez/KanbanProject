import mongoose from "mongoose";

export interface TaskDbType {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  taskListId: string;
  _v: string;
}

export interface TaskType {
  id: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  taskListId: string;
}

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: { type: [String] },
  color: { type: String },
  taskListId: { type: mongoose.Schema.Types.ObjectId, ref: "TaskList", required: true },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
