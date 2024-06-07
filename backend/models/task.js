const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: { type: [String] },
  color: { type: String },
  taskListId: { type: mongoose.Schema.Types.ObjectId, ref: "TaskList", required: true },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
