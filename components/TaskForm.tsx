"use client";
import { useEffect, useState } from "react";
import { TaskType } from "@/models/task";

interface TaskFormPropsType {
  taskInfo: TaskType;
  onSave: Function;
  onDelete?: Function;
  isLoading: boolean;
}

interface SelectType {
  text: string;
  value: string;
}

const colors: SelectType[] = [
  {
    text: "Red",
    value: "red-500",
  },
  {
    text: "Blue",
    value: "blue-500",
  },
  {
    text: "Indigo",
    value: "indigo-400",
  },
  {
    text: "Emerald",
    value: "emerald-500",
  },
  {
    text: "Purple",
    value: "purple-500",
  },
];

const categories: SelectType[] = [
  {
    text: "Formatting",
    value: "Formatting",
  },
  {
    text: "Note interface",
    value: "Note interface",
  },
  {
    text: "New note",
    value: "New note",
  },
];

function TaskForm({ taskInfo, onSave, onDelete, isLoading }: TaskFormPropsType) {
  const [title, setTitle] = useState<string>(taskInfo.title || "");
  const [description, setDescription] = useState<string>(taskInfo.description || "");
  const [tags, setTags] = useState<string[]>(taskInfo.tags || []);
  const [color, setColor] = useState<string>(taskInfo.color || "red-500");
  const [error, setError] = useState("");
  const { taskListId } = taskInfo;

  const validateForm = () => {
    if (!title) {
      setError("Task title is required!");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        title,
        description,
        tags,
        color,
        taskListId,
      });
    }
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-5 mb-20">
        <div className="p-10 rounded-3xl bg-neutral-800 cursor-pointer transition-all">
          <div className="mb-5">
            <label htmlFor="taskTitle" className="block mb-4 font-medium text-xl">
              Task Title
            </label>
            <input
              type="text"
              id="taskTitle"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="taskDecription" className="block mb-4 font-medium text-xl">
              Task Description
            </label>
            <textarea
              id="taskDecription"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-5">
            <label htmlFor="taskColor" className="block mb-4 font-medium text-xl">
              Task Color
            </label>
            <select
              id="taskColor"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              onChange={(e) => setColor(e.target.value)}
              value={color}
            >
              {colors.map((cl, index) => (
                <option key={index} value={cl.value}>
                  {cl.text}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="taskCategory" className="block mb-4 font-medium text-xl">
              Task Category
            </label>
            <select
              id="taskCategory"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              onChange={(e) => {
                let val = e.target.value;
                let copiedTags = [...(tags || [])];
                if (val) {
                  let index = copiedTags.findIndex((t) => t === val);
                  if (index > -1) {
                    copiedTags.splice(index, 1);
                  } else {
                    copiedTags.push(val);
                  }
                } else {
                  copiedTags = [];
                }
                setTags(copiedTags);
              }}
              multiple
              value={tags}
            >
              {categories.map((ct, index) => (
                <option key={index} value={ct.value}>
                  {ct.text}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSave}
                className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5 transition-all"
                disabled={isLoading}
              >
                {isLoading ? "Loading" : "Save Task"}
              </button>
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5 transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading" : "Delete Task"}
                </button>
              )}
            </div>
            {error && (
              <div className={`py-1 px-2 bg-red-500 rounded-lg w-[40%] abso right-0 flex justify-between items-center font-bold`}>
                {error}
                <span onClick={() => setError("")}>x</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskForm;
