import { TaskDbType } from "@/models/task";

const serializeTask = async (task: TaskDbType) => {
  return {
    id: task._id,
    title: task.title,
    description: task.description,
    tags: task.tags,
    color: task.color,
  };
};

export default { serializeTask };
