"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectType } from "@/models/project";
import { BaseResponseType } from "../../api/BaseResponse";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskList from "@/components/TaskList";

function Roadmap({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<ProjectType>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    if (id) {
      getProject(id);
    }
  }, [id]);

  const getProject = async (id: string) => {
    setIsLoading(true);
    try {
      const fetchResponse = await fetch(`/api/projects/${id}`);
      if (fetchResponse.ok) {
        const Response: BaseResponseType<ProjectType> = await fetchResponse.json();
        if (Response.success) {
          setProject(Response.data);
        }
      }
    } catch (error) {}
    setIsLoading(false);
  };

  const onDragEnd = (result: DropResult) => {
    // let copiedTaskLists = [...taskLists];
    // let source = result.source;
    // let destination = result.destination;
    // if (source && destination) {
    //   let sourceList = copiedTaskLists.find((list) => list.key == source.droppableId);
    //   let destinationList = copiedTaskLists.find((list) => list.key == destination.droppableId);
    //   if (sourceList && destinationList) {
    //     let draggableItemIndex = sourceList.items.findIndex((i) => i.id == result.draggableId);
    //     if (draggableItemIndex > -1) {
    //       let draggableItem = sourceList.items[draggableItemIndex];
    //       sourceList.items.splice(draggableItemIndex, 1);
    //       destinationList.items = [...destinationList.items.slice(0, destination.index), draggableItem, ...destinationList.items.slice(destination.index)];
    //     }
    //     setTaskLists(copiedTaskLists);
    //   }
    // }
  };

  const onAdd = (droppableId: string) => {
    // if (droppableId) {
    //   let copiedTaskLists = [...taskLists];
    //   let newTask: TaskType = {
    //     id: "124123123",
    //     title: "newTask",
    //     description: "test desc",
    //     tags: [],
    //     color: "red-500",
    //   };
    //   let destinationList = copiedTaskLists.find((list) => list.key == droppableId);
    //   if (destinationList) {
    //     destinationList.items.push(newTask);
    //     setTaskLists(copiedTaskLists);
    //   }
    // }
  };

  const handleTaskClick = (projectId: string) => {
    router.push(`/task/${projectId}`);
  };

  return (
    <>
      <div className="flex flex-wrap flex-col justify-start items-start mb-10">
        <h1 className="text-4xl font-bold mb-3">Roadmap {project?.title && `(${project.title})`}</h1>
        <p className="text-md underline text-gray-300">by Süleyman Dönmez</p>
      </div>
      {isLoading ? (
        <div className="text-2xl">Loading...</div>
      ) : project?.items?.length ? (
        <div className="grid grid-cols-1 gap-5 mb-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <DragDropContext onDragEnd={onDragEnd}>
            {project.items.map((taskList, index) => (
              <TaskList key={taskList.key} taskList={taskList} onAdd={onAdd} />
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
