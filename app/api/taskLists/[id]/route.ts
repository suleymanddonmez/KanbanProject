import { NextRequest, NextResponse } from "next/server";
import connect from "../../../../db";
import TaskList, { TaskListDbType, TaskListType } from "../../../../models/taskList";
import serializer from "../../../../serializers/taskList";
import { BaseResponseType } from "../../BaseResponse";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  let baseResponse: BaseResponseType<TaskListType> = {
    success: false,
  };
  try {
    const { id } = params;
    if (!id) {
      throw new Error("Task List id required!");
    }
    await connect();
    const taskList: TaskListDbType | null = await TaskList.findById(id);
    if (!taskList) {
      throw new Error("Task List not found!");
    }
    const serializedTaskList = await serializer.serializeTaskListWithTasks(taskList, new URL(request.url).origin);

    baseResponse.success = true;
    baseResponse.data = serializedTaskList;
    return NextResponse.json(baseResponse, { status: 200 });
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}
