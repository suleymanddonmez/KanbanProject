const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const serializeProject = (project) => {
  return {
    id: project._id,
    key: project.title.toLowerCase().replace(/\s+/g, "-"),
    title: project.title,
  };
};

const serializeProjectWithTaskLists = async (project) => {
  let taskLists = [];
  try {
    const taskListsResponse = await axios.get(`${process.env.HOSTNAME}/taskLists/filter`, { params: { projectId: project._id } });
    taskLists = taskListsResponse.data;
  } catch (error) {
    console.error("TaskLists alınırrken hata oluştu:", error);
  }
  return {
    ...serializeProject(project),
    items: taskLists,
  };
};

module.exports = { serializeProject, serializeProjectWithTaskLists };
