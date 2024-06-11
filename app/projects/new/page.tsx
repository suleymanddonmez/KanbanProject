"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectType } from "@/models/project";
import { fetchApi } from "../../api/BaseActions";
import { Context } from "@/app/contextProvider";

function NewProject() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const context = useContext(Context);
  const { updateTitle } = context;

  useEffect(() => {
    updateTitle("New Project");
  }, []);

  const validateForm = () => {
    if (!title) {
      setError("Project title is required!");
      return false;
    }
    setError("");
    return true;
  };

  const saveProject = async () => {
    setIsLoading(true);
    if (validateForm()) {
      const response = await fetchApi<ProjectType>("/api/projects", "POST", {
        title: title,
      });
      if (response.success) {
        router.push(`/`);
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
          <h1 className="text-4xl font-bold mb-3">New Project</h1>
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
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 mb-20">
        <div className="p-10 rounded-3xl bg-neutral-800 cursor-pointer transition-all">
          <div className="mb-5">
            <label htmlFor="projectTitle" className="block mb-4 font-medium text-xl">
              Project Title
            </label>
            <input
              type="text"
              id="projectTitle"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={saveProject}
              className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-5 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Save Project"}
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

export default NewProject;
