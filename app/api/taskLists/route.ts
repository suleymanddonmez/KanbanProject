import { NextRequest, NextResponse } from "next/server";
import connect from "../../../db";
import TaskList, { TaskListDbType, TaskListType } from "../../../models/taskList";
import serializer from "../../../serializers/taskList";
import { BaseResponseType } from "../BaseResponse";

export async function GET(request: NextRequest) {
  let baseResponse: BaseResponseType<TaskListType[]> = {
    success: false,
  };
  try {
    await connect();
    const taskLists: TaskListDbType[] = await TaskList.find();
    const serializedTaskLists = await Promise.all(taskLists.map(async (taskList) => await serializer.serializeTaskListWithTasks(taskList, new URL(request.url).origin)));

    baseResponse.success = true;
    baseResponse.data = serializedTaskLists;
    return NextResponse.json(baseResponse, { status: 200 });
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}
