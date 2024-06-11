"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TaskType } from "@/models/task";
import { fetchApi } from "../../../api/BaseActions";
import TaskForm from "@/components/TaskForm";
import { Context } from "@/app/contextProvider";

function NewTask({ params }: { params: { taskListId: string } }) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { taskListId } = params;

  const router = useRouter();

  const context = useContext(Context);
  const { updateTitle } = context;

  useEffect(() => {
    updateTitle("New Task");
  }, []);

  const saveTask = async (taskInfo: TaskType) => {
    setIsLoading(true);
    const response = await fetchApi<TaskType>("/api/tasks", "POST", {
      title: taskInfo.title,
      description: taskInfo.description,
      tags: taskInfo.tags,
      color: taskInfo.color,
      taskListId: taskListId,
    });
    if (response.success) {
      router.back();
    } else {
      setError(response.error || "An error occurred!");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="mb-10 lg:flex lg:justify-between lg:items-center">
        <div className="flex flex-wrap flex-col justify-start items-start mb-10">
          <h1 className="text-4xl font-bold mb-3">New Task</h1>
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
      <TaskForm
        taskInfo={{ id: "new", title: "", description: "", tags: [], color: "red-500", taskListId: taskListId }}
        onSave={saveTask}
        isLoading={isLoading}
      />
    </>
  );
}

export default NewTask;
