"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectType } from "@/models/project";
import { BaseResponseType } from "./api/BaseResponse";

export default function Home() {
  const [projects, setProjects] = useState<ProjectType[]>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    setIsLoading(true);
    try {
      const fetchResponse = await fetch("/api/projects");
      if (fetchResponse.ok) {
        const Response: BaseResponseType<ProjectType[]> = await fetchResponse.json();
        if (Response.success) {
          setProjects(Response.data);
        }
      }
    } catch (error) {}
    setIsLoading(false);
  };

  const handleProjectClick = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  const handleAddProjectClick = () => {
    router.push(`/project/new`);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap flex-col justify-start items-start mb-10">
          <h1 className="text-4xl font-bold mb-3">Roadmap</h1>
          <p className="text-md underline text-gray-300">by Süleyman Dönmez</p>
        </div>
        <button className="text-xl font-bold p-5 rounded-2xl bg-indigo-500 cursor-pointer hover:bg-neutral-600 transition-all" onClick={() => handleAddProjectClick()}>
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
              className="p-10 rounded-3xl bg-red-800 cursor-pointer hover:bg-neutral-600 transition-all"
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
