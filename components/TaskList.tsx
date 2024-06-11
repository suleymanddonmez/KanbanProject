import Task from "@/components/Task";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskListType } from "@/models/taskList";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/app/api/BaseActions";
import { useLayoutEffect, useRef, useState } from "react";

interface TaskListPropsType {
  taskList: TaskListType;
  notDeletable: boolean;
  refreshProject: Function;
}

function TaskList({ taskList, notDeletable, refreshProject }: TaskListPropsType) {
  const [height, setHeight] = useState(0);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const { id, title, items, projectId } = taskList;
  const router = useRouter();

  useLayoutEffect(() => {
    getCalcHeight();
  }, [items]);

  const deleteTaskList = async () => {
    if (notDeletable) {
      alert("This project is example project. The task list is not deletable! Please try in another project.");
      return;
    }
    const response = await fetchApi<TaskListType>(`/api/taskLists/${id}`, "DELETE");
    if (response.success) {
      refreshProject();
    } else {
      console.log(response.error);
      alert("An error occurred!");
    }
  };

  const getCalcHeight = () => {
    let h = 100;
    if (innerRef.current) {
      h = 0;
      let taskDivs = innerRef.current.querySelectorAll<HTMLElement>(".task-item");
      taskDivs.forEach((taskDiv) => {
        h += taskDiv.offsetHeight;
        const computedStyle = window.getComputedStyle(taskDiv);
        h += parseInt(computedStyle.marginTop) + parseInt(computedStyle.marginBottom);
      });
    }
    setHeight(h);
  };

  return (
    <div className="p-10 rounded-3xl bg-neutral-800 h-fit">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center justify-center">
          <h2 className="text-4xl font-bold">{title}</h2>
          <button
            className="w-[30px] h-[30px] flex items-center justify-center text-xs font-bold p-2 rounded-2xl bg-red-500 cursor-pointer hover:bg-neutral-600 transition-all mx-3"
            onClick={deleteTaskList}
          >
            X
          </button>
        </div>
        <span
          className="text-4xl cursor-pointer p-1 rounded-full transition-all w-10 h-10 flex items-center justify-center hover:bg-slate-200 hover:text-black"
          onClick={() => router.push(`/tasks/new/${id}`)}
        >
          +
        </span>
      </div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div
              ref={innerRef}
              className="transition-all"
              style={{
                minHeight: `${snapshot.isDraggingOver ? height + 150 : height}px`,
              }}
            >
              {items?.map((item, index) => (
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
    </div>
  );
}

export default TaskList;
