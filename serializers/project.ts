import { fetchApi } from "@/app/api/BaseActions";
import { defaultTaskLists } from "@/app/api/projects/route";
import { ProjectDbType } from "@/models/project";
import { TaskListType } from "@/models/taskList";

const serializeProject = async (project: ProjectDbType) => {
  return {
    id: project._id,
    key: project.title.toLowerCase().replace(/\s+/g, "-"),
    title: project.title,
    items: [],
  };
};

const serializeProjectWithTaskLists = async (project: ProjectDbType, hostname: string) => {
  let taskLists: TaskListType[] = [];
  const response = await fetchApi<TaskListType[]>(`${hostname}/api/taskLists/filter/${project._id}`);
  if (response.success && response.data) {
    taskLists = response.data;
    taskLists = taskLists.sort((x, y) => {
      const indexX = defaultTaskLists.indexOf(x.title);
      const indexY = defaultTaskLists.indexOf(y.title);
      if (indexX === -1 && indexY === -1) {
        return 0;
      }
      if (indexX === -1) {
        return 1;
      }
      if (indexY === -1) {
        return -1;
      }
      return indexX - indexY;
    });
  }
  return {
    ...(await serializeProject(project)),
    items: taskLists,
  };
};

export default { serializeProject, serializeProjectWithTaskLists };
