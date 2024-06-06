import React from "react";
import Task, { TaskType } from "@/components/Task";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface TaskListType {
  key: string;
  title: string;
  items: TaskType[];
}

interface TaskListPropsType {
  taskList: TaskListType;
}

function TaskList({ taskList }: TaskListPropsType) {
  const { key, title, items } = taskList;
  return (
    <Droppable droppableId={key}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="p-10 rounded-3xl bg-neutral-800">
            <div className="mb-5">
              <h2 className="text-4xl font-bold">{title}</h2>
            </div>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Task task={item} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default TaskList;
