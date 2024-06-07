const mongoose = require("mongoose");

const taskListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
});

const TaskList = mongoose.model("TaskList", taskListSchema);

module.exports = TaskList;
