import React from "react";
import { TaskType } from "@/models/task";
import { useRouter } from "next/navigation";

interface TaskPropsType {
  task: TaskType;
}

function Task({ task }: TaskPropsType) {
  const router = useRouter();
  return (
    <div className={`p-7 ${task.color ? "bg-" + task.color : "bg-indigo-400"} mb-4 rounded-lg task-item relative`}>
      <span className="absolute text-xs ml-2 right-2 top-2 cursor-pointer font-bold" onClick={() => router.push(`/tasks/${task.id}`)}>
        Edit
      </span>
      <span className="text-lg font-bold">{task.title}</span>
      {task.description && <p className="text-md mt-3 text-gray-200">{task.description}</p>}
      {<TaskTags tags={task.tags} />}
    </div>
  );
}

interface TaskTagsPropsType {
  tags: string[];
}

function TaskTags({ tags }: TaskTagsPropsType) {
  if (tags.length > 0) {
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={`tag_${index}`} className="text-sm text-gray-200 border px-2 py-1">
            {tag}
          </span>
        ))}
      </div>
    );
  }
  return;
}

export default Task;
