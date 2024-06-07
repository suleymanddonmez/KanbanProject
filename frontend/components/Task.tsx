import React from "react";

export interface TaskType {
  id: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
}

interface TaskPropsType {
  task: TaskType;
}

function Task({ task }: TaskPropsType) {
  return (
    <div className={`p-7 ${task.color ? "bg-" + task.color : "bg-indigo-400"} mb-4 rounded-lg`}>
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
      <div className="mt-3">
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
