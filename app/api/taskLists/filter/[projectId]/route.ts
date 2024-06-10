import { NextRequest, NextResponse } from "next/server";
import connect from "../../../../../db";
import TaskList, { TaskListDbType, TaskListType } from "../../../../../models/taskList";
import serializer from "../../../../../serializers/taskList";
import { BaseResponseType, fetchApi } from "../../../BaseActions";

export async function GET(request: NextRequest, { params }: { params: { projectId: string } }) {
  let baseResponse: BaseResponseType<TaskListType[]> = {
    success: false,
  };
  try {
    const { projectId } = params;
    if (!projectId) {
      throw new Error("Project id required!");
    }
    await connect();
    const taskLists: TaskListDbType[] = await TaskList.find({ projectId: projectId });
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

export async function DELETE(request: NextRequest, { params }: { params: { projectId: string } }) {
  let baseResponse: BaseResponseType<TaskListType[]> = {
    success: false,
  };
  try {
    const { projectId } = params;
    if (!projectId) {
      throw new Error("Project id required!");
    }
    await connect();

    // delete related taskLists
    const taskListsToDelete: TaskListDbType[] = await TaskList.find({ projectId: projectId });
    const serializedTaskLists = await Promise.all(taskListsToDelete.map(async (taskList) => await serializer.serializeTaskList(taskList)));
    const deleteResult = await Promise.all(
      serializedTaskLists.map(async (taskList) => await fetchApi(`${new URL(request.url).origin}/api/tasks/filter/${taskList.id}`, "DELETE"))
    );
    const taskList = await TaskList.deleteMany({ projectId: projectId });

    baseResponse.success = true;
    baseResponse.data = serializedTaskLists;
    return NextResponse.json(baseResponse, { status: 200 });
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}
