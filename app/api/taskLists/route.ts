import { NextRequest, NextResponse } from "next/server";
import connect from "../../../db";
import TaskList, { TaskListDbType, TaskListType } from "../../../models/taskList";
import { ProjectType } from "../../../models/project";
import serializer from "../../../serializers/taskList";
import { BaseResponseType, fetchApi } from "../BaseActions";

export async function GET(request: NextRequest) {
  let baseResponse: BaseResponseType<TaskListType[]> = {
    success: false,
  };
  try {
    await connect();
    const taskLists: TaskListDbType[] = await TaskList.find();
    const serializedTaskLists = await Promise.all(
      taskLists.map(async (taskList) => await serializer.serializeTaskListWithTasks(taskList, new URL(request.url).origin))
    );
    baseResponse.success = true;
    baseResponse.data = serializedTaskLists;
    return NextResponse.json(baseResponse, { status: 200 });
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  let baseResponse: BaseResponseType<TaskListType> = {
    success: false,
  };
  const body = await request.json();
  try {
    await connect();
    // control project existing
    const hostname = new URL(request.url).origin;
    const response = await fetchApi<ProjectType>(`${hostname}/api/projects/${body.projectId}`);
    if (response.success) {
      const taskList = await TaskList.create({ title: body.title, projectId: body.projectId });
      const serializedTaskList = await serializer.serializeTaskList(taskList);
      baseResponse.success = true;
      baseResponse.data = serializedTaskList;
      return NextResponse.json(baseResponse, { status: 200 });
    } else {
      throw new Error("Project not found!");
    }
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}
