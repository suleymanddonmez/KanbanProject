"use client";
import Client, { BaseResponseType } from "@/api/Client";
import { TaskType } from "@/components/Task";
import TaskList from "@/components/TaskList";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const tasks = [
  {
    id: "12sad312asd3",
    key: "backlog",
    title: "Backlog",
    items: [
      {
        id: "1",
        title: "Twilio integration",
        description: "Create new note via SMS, Support text, audio, links, and media.",
        tags: [],
        color: "purple-500",
      },
      {
        id: "2",
        title: "Markdown support",
        description: "Markdown shorthand converts to formatting",
        tags: ["Formatting"],
        color: "indigo-400",
      },
    ],
  },
  {
    id: "12312123asd3",
    key: "todo",
    title: "To do",
    items: [
      {
        id: "3",
        title: "Tablet view",
        description: "",
        tags: [],
        color: "red-500",
      },
      {
        id: "4",
        title: "Mobile view",
        description: "Functions for both web responsive and native apps. Note: Android and iOS will need unique share icons.",
        tags: [],
        color: "red-500",
      },
      {
        id: "5",
        title: "Audio recording in note",
        description: "Show audio in a note and playback UI",
        tags: ["Note interface"],
        color: "indigo-400",
      },
      {
        id: "6",
        title: "Bookmark in note",
        description: "Show rich link UI in a note, and feature to render website screenshot",
        tags: ["Note interface"],
        color: "indigo-400",
      },
      {
        id: "7",
        title: "Image viewer",
        description: "Opens when clicking on the thumbnail in the list or on the image in the note",
        tags: [],
        color: "indigo-400",
      },
    ],
  },
  {
    id: "123123",
    key: "inprogress",
    title: "In progress",
    items: [
      {
        id: "8",
        title: "Desktop view",
        description: "PWA for website and native apps. Note: Windows and Mac will need unique share icons.",
        tags: [],
        color: "red-500",
      },
      {
        id: "9",
        title: "Mobile home screen",
        description: "Folders, tags, and notes lists are sorted recent.",
        tags: [],
        color: "blue-500",
      },
      {
        id: "10",
        title: "Formatting options",
        description: "Mobile formatting bar expands and collapses when tapping the format icon.",
        tags: [],
        color: "blue-500",
      },
      {
        id: "11",
        title: "Media in note",
        description: "Image & video with player UI",
        tags: ["Note interface"],
        color: "indigo-400",
      },
    ],
  },
  {
    id: "12312asd3",
    key: "designed",
    title: "Designed",
    items: [
      {
        id: "12",
        title: "Audio recording",
        description: "Interface for when recording a new audio note",
        tags: ["New note"],
        color: "emerald-500",
      },
      {
        id: "13",
        title: "Bookmarking",
        description: "Interface for when creating a new link note.",
        tags: ["New note"],
        color: "emerald-500",
      },
    ],
  },
];

export default function Home() {
  const [taskLists, setTaskLists] = useState(tasks);

  const onDragEnd = (result: DropResult) => {
    let copiedTaskLists = [...taskLists];

    let source = result.source;
    let destination = result.destination;

    if (source && destination) {
      let sourceList = copiedTaskLists.find((list) => list.key == source.droppableId);
      let destinationList = copiedTaskLists.find((list) => list.key == destination.droppableId);

      if (sourceList && destinationList) {
        let draggableItemIndex = sourceList.items.findIndex((i) => i.id == result.draggableId);
        if (draggableItemIndex > -1) {
          let draggableItem = sourceList.items[draggableItemIndex];
          sourceList.items.splice(draggableItemIndex, 1);
          destinationList.items = [
            ...destinationList.items.slice(0, destination.index),
            draggableItem,
            ...destinationList.items.slice(destination.index),
          ];
        }
        setTaskLists(copiedTaskLists);
      }
    }
  };

  const onAdd = (droppableId: string) => {
    if (droppableId) {
      let copiedTaskLists = [...taskLists];
      let newTask: TaskType = {
        id: "124123123",
        title: "newTask",
        description: "test desc",
        tags: [],
        color: "red-500",
      };
      let destinationList = copiedTaskLists.find((list) => list.key == droppableId);
      if (destinationList) {
        destinationList.items.push(newTask);
        setTaskLists(copiedTaskLists);
      }
    }
  };

  const getProjects = () => {
    Client.actions.get(Client.requests.getProjects, null, (response: BaseResponseType) => {
      console.log(response);
    });
  };

  return (
    <>
      <div className="flex flex-wrap flex-col justify-start items-start mb-10">
        <h1 className="text-4xl font-bold mb-3">Roadmap</h1>
        <p className="text-md underline text-gray-300">by Süleyman Dönmez</p>
        <button onClick={getProjects}>Test</button>
      </div>

      <div className="grid grid-cols-1 gap-5 mb-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {taskLists.map((taskList) => (
            <TaskList key={taskList.key} taskList={taskList} onAdd={onAdd} />
          ))}
        </DragDropContext>
      </div>
    </>
  );
}
