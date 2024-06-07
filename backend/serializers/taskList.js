const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const serializeTaskList = (taskList) => {
  return {
    id: taskList._id,
    key: taskList.title.toLowerCase().replace(/\s+/g, "-"),
    title: taskList.title,
  };
};

const serializeTaskListWithTasks = async (taskList) => {
  let tasks = [];
  try {
    const tasksResponse = await axios.get(`${process.env.HOSTNAME}/tasks/filter`, { params: { taskListId: taskList._id } });
    tasks = tasksResponse.data;
  } catch (error) {
    console.error("Tasks alınırrken hata oluştu:", error);
  }
  return {
    ...serializeTaskList(taskList),
    items: tasks,
  };
};

module.exports = { serializeTaskList, serializeTaskListWithTasks };
