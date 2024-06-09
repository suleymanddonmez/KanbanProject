import { BaseResponseType } from "@/app/api/BaseResponse";
import { TaskType } from "@/models/task";
import { TaskListDbType } from "@/models/taskList";

const serializeTaskList = async (taskList: TaskListDbType) => {
  return {
    id: taskList._id,
    key: taskList.title.toLowerCase().replace(/\s+/g, "-"),
    title: taskList.title,
  };
};

const serializeTaskListWithTasks = async (taskList: TaskListDbType, hostName: string) => {
  let tasks: TaskType[] = [];
  try {
    const fetchResponse = await fetch(`${hostName}/api/tasks/filter/${taskList._id}`);
    if (fetchResponse.ok) {
      let tasksResponse: BaseResponseType<TaskType[]> = await fetchResponse.json();
      if (tasksResponse.success && tasksResponse.data) {
        tasks = tasksResponse.data;
      }
    } else {
    }
  } catch (error) {
    console.error("Tasks alınırrken hata oluştu:", error);
  }
  return {
    ...(await serializeTaskList(taskList)),
    items: tasks,
  };
};

export default { serializeTaskList, serializeTaskListWithTasks };
