"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskType } from "@/models/task";
import { fetchApi } from "../../../api/BaseActions";

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

function NewTask({ params }: { params: { taskListId: string } }) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [color, setColor] = useState<string>("red-500");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { taskListId } = params;
  const router = useRouter();

  const validateForm = () => {
    if (!title) {
      setError("Task title is required!");
      return false;
    }
    setError("");
    return true;
  };

  const saveTask = async () => {
    setIsLoading(true);
    if (validateForm()) {
      const response = await fetchApi<TaskType>("/api/tasks", "POST", {
        title: title,
        description: description,
        tags: tags,
        color: color,
        taskListId: taskListId,
      });
      if (response.success) {
        router.back();
      } else {
        setError(response.error || "An error occurred!");
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap flex-col justify-start items-start mb-10">
          <h1 className="text-4xl font-bold mb-3">New Task</h1>
          <a className="text-md underline text-gray-300" href="https://www.linkedin.com/in/suleymanddonmez/" target="_blank">
            by Süleyman Dönmez
          </a>
        </div>
        <div className="flex gap-2">
          <button className="text-xl font-bold p-5 rounded-2xl bg-indigo-400 cursor-pointer hover:bg-neutral-600 transition-all" onClick={() => router.push(`/`)}>
            Home
          </button>
          <button className="text-xl font-bold p-5 rounded-2xl bg-indigo-400 cursor-pointer hover:bg-neutral-600 transition-all" onClick={() => router.back()}>
            Return To Project
          </button>
        </div>
      </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-2">
            <div className="mb-5">
              <label htmlFor="taskColor" className="block mb-4 font-medium text-xl">
                Task Color
              </label>
              <select id="taskColor" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" onChange={(e) => setColor(e.target.value)}>
                {colors.map((cl, index) =>
                  cl.text === color ? (
                    <option key={index} value={cl.value} selected>
                      {cl.text}
                    </option>
                  ) : (
                    <option key={index} value={cl.value}>
                      {cl.text}
                    </option>
                  )
                )}
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
                  let index = copiedTags.findIndex((t) => t === val);
                  if (index > -1) {
                    copiedTags.splice(index, 1);
                  } else {
                    copiedTags.push(val);
                  }
                  setTags(copiedTags);
                }}
                multiple
              >
                {categories.map((ct, index) =>
                  tags?.includes(ct.text) ? (
                    <option key={index} value={ct.value} selected>
                      {ct.text}
                    </option>
                  ) : (
                    <option key={index} value={ct.value}>
                      {ct.text}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={saveTask}
              className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Save Task"}
            </button>
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

export default NewTask;
