"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TaskType } from "@/models/task";
import { fetchApi } from "../../api/BaseActions";
import TaskForm from "@/components/TaskForm";
import { Context } from "@/app/contextProvider";

function TaskAction({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<TaskType>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = params;

  const router = useRouter();

  const context = useContext(Context);
  const { updateTitle } = context;

  useEffect(() => {
    updateTitle(task?.title || "Task Detail");
  }, [task]);

  useEffect(() => {
    if (id) {
      getTask();
    }
  }, [id]);

  const saveTask = async (taskInfo: TaskType) => {
    setIsLoading(true);
    const response = await fetchApi<TaskType>(`/api/tasks/${id}`, "PATCH", {
      task: { ...task, ...taskInfo },
    });
    if (response.success) {
      router.back();
    } else {
      setError(response.error || "An error occurred!");
    }
    setIsLoading(false);
  };

  const getTask = async () => {
    setIsLoading(true);
    const response = await fetchApi<TaskType>(`/api/tasks/${id}`);
    if (response.success && response.data) {
      setTask(response.data);
    } else {
      setError(response.error || "An error occurred!");
    }
    setIsLoading(false);
  };

  const delTask = async () => {
    setIsLoading(true);
    const response = await fetchApi<TaskType>(`/api/tasks/${id}`, "DELETE");
    if (response.success && response.data) {
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
          <h1 className="text-4xl font-bold mb-3">Task Edit</h1>
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
      {!task && isLoading ? (
        <div className="text-2xl">Loading...</div>
      ) : (
        task && <TaskForm taskInfo={task} onSave={saveTask} onDelete={delTask} isLoading={isLoading} />
      )}
    </>
  );
}

export default TaskAction;
