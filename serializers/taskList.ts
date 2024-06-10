import { fetchApi } from "@/app/api/BaseActions";
import { TaskType } from "@/models/task";
import { TaskListDbType } from "@/models/taskList";

const serializeTaskList = async (taskList: TaskListDbType) => {
  return {
    id: taskList._id,
    key: taskList.title.toLowerCase().replace(/\s+/g, "-"),
    title: taskList.title,
    projectId: taskList.projectId,
    items: [],
  };
};

const serializeTaskListWithTasks = async (taskList: TaskListDbType, hostname: string) => {
  let tasks: TaskType[] = [];
  const response = await fetchApi<TaskType[]>(`${hostname}/api/tasks/filter/${taskList._id}`);
  if (response.success && response.data) {
    tasks = response.data;
  }
  return {
    ...(await serializeTaskList(taskList)),
    items: tasks,
  };
};

export default { serializeTaskList, serializeTaskListWithTasks };
