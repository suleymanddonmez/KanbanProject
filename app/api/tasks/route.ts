import { NextRequest, NextResponse } from "next/server";
import connect from "../../../db";
import Task, { TaskDbType, TaskType } from "../../../models/task";
import { TaskListType } from "@/models/taskList";
import serializer from "../../../serializers/task";
import { BaseResponseType, fetchApi } from "../BaseActions";

export async function GET(request: NextRequest) {
  let baseResponse: BaseResponseType<TaskType[]> = {
    success: false,
  };
  try {
    await connect();
    const tasks: TaskDbType[] = await Task.find();
    const serializeTasks = await Promise.all(tasks.map(async (task) => await serializer.serializeTask(task)));

    baseResponse.success = true;
    baseResponse.data = serializeTasks;
    return NextResponse.json(baseResponse, { status: 200 });
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  let baseResponse: BaseResponseType<TaskType> = {
    success: false,
  };
  const body = await request.json();
  try {
    await connect();
    // control taskList existing
    const hostname = new URL(request.url).origin;
    const response = await fetchApi<TaskListType>(`${hostname}/api/taskLists/${body.taskListId}`);
    if (response.success) {
      const task = await Task.create({
        title: body.title,
        description: body.description,
        tags: body.tags,
        color: body.color,
        taskListId: body.taskListId,
        order: 0
      });
      const serializedTask = await serializer.serializeTask(task);
      baseResponse.success = true;
      baseResponse.data = serializedTask;
      return NextResponse.json(baseResponse, { status: 200 });
    } else {
      throw new Error("Task List not found!");
    }
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}
