"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TaskListType } from "@/models/taskList";
import { fetchApi } from "../../../api/BaseActions";
import { Context } from "@/app/contextProvider";

function NewTaskList({ params }: { params: { projectId: string } }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { projectId } = params;

  const router = useRouter();

  const context = useContext(Context);
  const { updateTitle } = context;

  useEffect(() => {
    updateTitle("New Task List");
  }, []);

  const validateForm = () => {
    if (!title) {
      setError("Task List title is required!");
      return false;
    }
    setError("");
    return true;
  };

  const saveTaskList = async () => {
    setIsLoading(true);
    if (validateForm()) {
      const response = await fetchApi<TaskListType>("/api/taskLists", "POST", {
        title: title,
        projectId: projectId,
      });
      if (response.success) {
        router.push(`/projects/${projectId}`);
      } else {
        setError(response.error || "An error occurred!");
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="mb-10 lg:flex lg:justify-between lg:items-center">
        <div className="flex flex-wrap flex-col justify-start items-start mb-10">
          <h1 className="text-4xl font-bold mb-3">New Task List</h1>
          <a className="text-md underline text-gray-300" href="https://www.linkedin.com/in/suleymanddonmez/" target="_blank">
            by Süleyman Dönmez
          </a>
        </div>
        <div className="flex gap-2">
          <button
            className="text-xl font-bold p-5 rounded-2xl bg-indigo-400 cursor-pointer hover:bg-neutral-600 transition-all"
            onClick={() => router.push(`/`)}
          >
            Home
          </button>
          <button
            className="text-xl font-bold p-5 rounded-2xl bg-indigo-400 cursor-pointer hover:bg-neutral-600 transition-all"
            onClick={() => router.back()}
          >
            Return To Project
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 mb-20">
        <div className="p-10 rounded-3xl bg-neutral-800 cursor-pointer transition-all">
          <div className="mb-5">
            <label htmlFor="taskListTitle" className="block mb-4 font-medium text-xl">
              Task List Title
            </label>
            <input
              type="text"
              id="taskListTitle"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={saveTaskList}
              className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Save Task List"}
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

export default NewTaskList;
