require("../db");
const express = require("express");
const router = express.Router();
const TaskList = require("../models/taskList");

const { serializeTaskList, serializeTaskListWithTasks } = require("../serializers/taskList");

router.post("/add", async (req, res) => {
  try {
    const { title, projectId } = req.body;
    const newTaskList = new TaskList({ title, projectId });
    await newTaskList.save();
    res.status(201).json(serializeTaskList(newTaskList));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const taskLists = await TaskList.find({});
    const serializedTaskLists = taskLists.map((taskList) => serializeTaskList(taskList));
    res.status(200).json(serializedTaskLists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/filter", async (req, res) => {
  try {
    const { projectId } = req.query;
    if (!projectId) {
      return res.status(400).json({ error: "Project Id gerekli" });
    }
    const taskLists = await TaskList.find({ projectId });
    const serializedTaskLists = await Promise.all(taskLists.map(async (taskList) => await serializeTaskListWithTasks(taskList)));
    res.status(200).json(serializedTaskLists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/one", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Task List Id gerekli" });
    }
    const taskList = await TaskList.findById(id);
    if (!taskList) {
      return res.status(404).json({ error: "Task List bulunamadı" });
    }
    res.status(200).json(serializeTaskList(taskList));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTaskList = await TaskList.findByIdAndDelete(id);
    if (!deletedTaskList) {
      return res.status(404).json({ error: "Proje bulunamadı" });
    }
    res.status(200).json({ message: "Task List başarıyla silindi", taskList: serializeTaskList(deletedTaskList) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
