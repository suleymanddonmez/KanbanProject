import { fetchApi } from "@/app/api/BaseActions";
import { ProjectDbType } from "@/models/project";
import { TaskListType } from "@/models/taskList";

const serializeProject = async (project: ProjectDbType) => {
  return {
    id: project._id,
    key: project.title.toLowerCase().replace(/\s+/g, "-"),
    title: project.title,
  };
};

const serializeProjectWithTaskLists = async (project: ProjectDbType, hostname: string) => {
  let taskLists: TaskListType[] = [];
  const response = await fetchApi<TaskListType[]>(`${hostname}/api/taskLists/filter/${project._id}`);
  if (response.success && response.data) {
    taskLists = response.data;
  }
  return {
    ...(await serializeProject(project)),
    items: taskLists,
  };
};

export default { serializeProject, serializeProjectWithTaskLists };
