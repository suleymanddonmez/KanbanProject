import { BaseResponseType } from "@/app/api/BaseResponse";
import { ProjectDbType } from "@/models/project";
import { TaskListType } from "@/models/taskList";

const serializeProject = async (project: ProjectDbType) => {
  return {
    id: project._id,
    key: project.title.toLowerCase().replace(/\s+/g, "-"),
    title: project.title,
  };
};

const serializeProjectWithTaskLists = async (project: ProjectDbType, hostName: string) => {
  let taskLists: TaskListType[] = [];
  try {
    const fetchResponse = await fetch(`${hostName}/api/taskLists/filter/${project._id}`);
    if (fetchResponse.ok) {
      let taskListsResponse: BaseResponseType<TaskListType[]> = await fetchResponse.json();
      if (taskListsResponse.success && taskListsResponse.data) {
        taskLists = taskListsResponse.data;
      }
    }
  } catch (error) {
    console.error("TaskLists alınırrken hata oluştu:", error);
  }
  return {
    ...(await serializeProject(project)),
    items: taskLists,
  };
};

export default { serializeProject, serializeProjectWithTaskLists };
