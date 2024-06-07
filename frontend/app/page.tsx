"use client";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Client, { BaseResponseType } from "@/api/Client";

export interface ProjectType {
  id: string;
  key: string;
  title: string;
}

export default function Home() {
  const [projects, setProject] = useState<ProjectType[]>();
  // const router = useRouter();

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = () => {
    Client.actions.get(Client.requests.getProjects, null, (response: BaseResponseType) => {
      setProject(response.data);
    });
  };

  if (!projects) {
    return <>Loading</>;
  }

  return (
    <>
      <div className="flex flex-wrap flex-col justify-start items-start mb-10">
        <h1 className="text-4xl font-bold mb-3">Roadmap</h1>
        <p className="text-md underline text-gray-300">by Süleyman Dönmez</p>
      </div>

      <div className="grid grid-cols-1 gap-5 mb-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {projects?.map((project, index) => (
          <div
            key={project.id}
            className="p-10 rounded-3xl bg-neutral-800"
            // onClick={() => {
            //   router.push(`/project/${project.id}`);
            // }}
          >
            <div className="flex justify-center items-center">
              <h2 className="text-2xl font-bold">{project.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
