"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Client, { BaseResponseType } from "@/api/Client";
import { TaskType } from "@/components/Task";
import TaskList, { TaskListType } from "@/components/TaskList";
import { ProjectType } from "../page";

export interface ProjectWithTaskListType extends ProjectType {
  items: TaskListType[];
}

function RoadMap() {
  const [project, setProject] = useState<ProjectWithTaskListType[] | null>(null);

  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div className="flex flex-wrap flex-col justify-start items-start mb-10">
        <h1 className="text-4xl font-bold mb-3">{id}</h1>
        <p className="text-md underline text-gray-300">by Süleyman Dönmez</p>
      </div>
    </>
  );
}

export default RoadMap;
