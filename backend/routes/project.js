require("../db");
const express = require("express");
const router = express.Router();
const Project = require("../models/project");

const { serializeProject, serializeProjectWithTaskLists } = require("../serializers/project");

router.post("/add", async (req, res) => {
  try {
    const { title } = req.body;
    const newProject = new Project({ title });
    await newProject.save();
    res.status(201).json(serializeProject(newProject));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const projects = await Project.find({});
    const serializedProjects = projects.map((project) => serializeProject(project));
    res.status(200).json(serializedProjects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/one", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Proje Id gerekli" });
    }
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Proje bulunamadı" });
    }
    const serializedProject = await serializeProjectWithTaskLists(project);
    res.status(200).json(serializedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ error: "Proje bulunamadı" });
    }
    res.status(200).json({ message: "Proje başarıyla silindi", project: serializeProject(deletedProject) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
