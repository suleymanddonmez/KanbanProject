"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectType } from "@/models/project";
import { fetchApi } from "./api/BaseActions";
import { Context } from "@/app/contextProvider";

export default function Home() {
  const [projects, setProjects] = useState<ProjectType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const context = useContext(Context);
  const { updateTitle } = context;

  useEffect(() => {
    updateTitle("All Projects");
    getProjects();
  }, []);

  const getProjects = async () => {
    setIsLoading(true);
    const response = await fetchApi<ProjectType[]>("/api/projects");
    if (response.success) {
      setProjects(response.data);
    } else {
      console.log(response.error);
    }
    setIsLoading(false);
  };

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  const handleAddProjectClick = () => {
    router.push(`/projects/new`);
  };

  return (
    <>
      <div className="mb-10 lg:flex lg:justify-between lg:items-center">
        <div className="flex flex-wrap flex-col justify-start items-start mb-10">
          <h1 className="text-4xl font-bold mb-3">All Projects</h1>
          <a className="text-md underline text-gray-300" href="https://www.linkedin.com/in/suleymanddonmez/" target="_blank">
            by Süleyman Dönmez
          </a>
        </div>
        <button
          className="text-xl font-bold p-5 rounded-2xl bg-indigo-500 cursor-pointer hover:bg-neutral-600 transition-all"
          onClick={() => handleAddProjectClick()}
        >
          + New Project
        </button>
      </div>

      {isLoading ? (
        <div className="text-2xl">Loading...</div>
      ) : projects?.length ? (
        <div className="grid grid-cols-1 gap-5 mb-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="p-10 rounded-3xl bg-neutral-800 cursor-pointer hover:bg-neutral-600 transition-all"
              onClick={() => {
                handleProjectClick(project.id);
              }}
            >
              <div className="flex justify-center items-center">
                <h2 className="text-2xl font-bold">{project.title}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-2xl">There is no project!</div>
      )}
    </>
  );
}
