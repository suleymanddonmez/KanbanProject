"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectType } from "@/models/project";
import { fetchApi } from "../../api/BaseActions";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskList from "@/components/TaskList";
import { Context } from "@/app/contextProvider";

const notDeleteableProjectId = "6666f966a149e14e2e550f39";
const defaultTaskLists = ["Backlog", "To do", "In progress", "Designed"];

function Roadmap({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<ProjectType>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = params;
  const notDeletable = notDeleteableProjectId == id;

  const router = useRouter();

  const context = useContext(Context);
  const { updateTitle } = context;

  useEffect(() => {
    updateTitle?.(project?.title ? `${project.title} Roadmap` : "Project Roadmap");
  }, [project, updateTitle]);

  useEffect(() => {
    if (id) {
      getProject(id);
    }
  }, [id]);

  const getProject = async (id: string) => {
    setIsLoading(true);
    const response = await fetchApi<ProjectType>(`/api/projects/${id}`);
    if (response.success) {
      setProject(response.data);
    } else {
      console.log(response.error);
      alert("An error occurred!");
    }
    setIsLoading(false);
  };

  const updateProject = async (project: ProjectType) => {
    const response = await fetchApi<ProjectType>(`/api/projects/${id}`, "PATCH", {
      project: project,
    });
    if (response.success && response.data) {
      setProject(response.data);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (project) {
      let copiedProject: ProjectType = {
        id: project.id,
        key: project.key,
        title: project.title,
        items: project.items ? [...project.items] : [],
      };

      let source = result.source;
      let destination = result.destination;
      if (source && destination) {
        let sourceList = copiedProject.items.find((list) => list.id == source.droppableId);
        let destinationList = copiedProject.items.find((list) => list.id == destination.droppableId);
        if (sourceList && destinationList) {
          let draggableItemIndex = sourceList.items.findIndex((i) => i.id == result.draggableId);
          if (draggableItemIndex > -1) {
            let draggableItem = sourceList.items[draggableItemIndex];
            draggableItem.taskListId = destination.droppableId;
            sourceList.items.splice(draggableItemIndex, 1);
            destinationList.items = [
              ...destinationList.items.slice(0, destination.index),
              draggableItem,
              ...destinationList.items.slice(destination.index),
            ];
          }
          setProject(copiedProject);
          updateProject(copiedProject);
        }
      }
    }
  };

  const deleteProject = async () => {
    if (notDeletable) {
      alert("This project is example project. It is not deletable! Please try in another project.");
      return;
    }
    const response = await fetchApi<ProjectType>(`/api/projects/${id}`, "DELETE");
    if (response.success) {
      router.push(`/`);
    } else {
      console.log(response.error);
      alert("An error occurred!");
    }
  };

  return (
    <>
      <div className="mb-10 lg:flex lg:justify-between lg:items-center">
        <div className="flex flex-wrap flex-col justify-start items-start mb-10">
          <h1 className="text-4xl font-bold mb-3 flex items-center">
            {project?.title && `${project.title} `}Roadmap
            <button
              className="w-[30px] h-[30px] flex items-center justify-center text-xs font-bold p-2 rounded-2xl bg-red-500 cursor-pointer hover:bg-neutral-600 transition-all mx-3"
              onClick={() => deleteProject()}
            >
              X
            </button>
          </h1>
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
            className="text-xl font-bold p-5 rounded-2xl bg-indigo-500 cursor-pointer hover:bg-neutral-600 transition-all"
            onClick={() => router.push(`/taskLists/new/${id}`)}
          >
            + New Task List
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="text-2xl">Loading...</div>
      ) : project?.items?.length ? (
        <div className="grid grid-cols-1 gap-5 mb-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <DragDropContext onDragEnd={onDragEnd}>
            {project.items.map((taskList, index) => (
              <TaskList
                key={taskList.key}
                taskList={taskList}
                notDeletable={notDeletable && defaultTaskLists.indexOf(taskList.title) > -1}
                refreshProject={() => getProject(id)}
              />
            ))}
          </DragDropContext>
        </div>
      ) : (
        <div className="text-2xl">There is no TaskList in this project!</div>
      )}
    </>
  );
}

export default Roadmap;
