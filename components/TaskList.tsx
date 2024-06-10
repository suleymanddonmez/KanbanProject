import Task from "@/components/Task";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskListType } from "@/models/taskList";
import { useRouter } from "next/navigation";

interface TaskListPropsType {
  taskList: TaskListType;
  onAdd: Function;
}

function TaskList({ taskList, onAdd }: TaskListPropsType) {
  const { id, key, title, items } = taskList;
  const router = useRouter();
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="p-10 rounded-3xl bg-neutral-800">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-4xl font-bold">{title}</h2>
              <span
                className="text-4xl cursor-pointer p-1 rounded-full transition-all w-10 h-10 flex items-center justify-center hover:bg-slate-200 hover:text-black"
                onClick={() => router.push(`/tasks/new/${id}`)}
              >
                +
              </span>
            </div>
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
  );
}

export default TaskList;
