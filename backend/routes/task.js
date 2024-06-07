require("../db");
const express = require("express");
const router = express.Router();
const Task = require("../models/task");

const { serializeTask } = require("../serializers/task");

router.post("/add", async (req, res) => {
  try {
    const { title, description, tags, color, taskListId } = req.body;
    const newTask = new Task({ title, description, tags, color, taskListId });
    await newTask.save();
    res.status(201).json(serializeTask(newTask));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find({});
    const serializedTasks = tasks.map((task) => serializeTask(task));
    res.status(200).json(serializedTasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/filter", async (req, res) => {
  try {
    const { taskListId } = req.query;
    if (!taskListId) {
      return res.status(400).json({ error: "Task List Id gerekli" });
    }
    const tasks = await Task.find({ taskListId });
    const serializedTasks = tasks.map((task) => serializeTask(task));
    res.status(200).json(serializedTasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/one", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Task Id gerekli" });
    }
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task bulunamadı" });
    }
    res.status(200).json(serializeTask(task));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Proje bulunamadı" });
    }
    res.status(200).json({ message: "Task başarıyla silindi", task: serializeTask(deletedTask) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
