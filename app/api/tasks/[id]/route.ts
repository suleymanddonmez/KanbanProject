import { NextRequest, NextResponse } from "next/server";
import connect from "../../../../db";
import Task, { TaskDbType, TaskType } from "../../../../models/task";
import serializer from "../../../../serializers/task";
import { BaseResponseType } from "../../BaseResponse";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  let baseResponse: BaseResponseType<TaskType[]> = {
    success: false,
  };
  try {
    const { id } = params;
    if (!id) {
      throw new Error("Task id required!");
    }
    await connect();
    const tasks: TaskDbType[] = await Task.find();
    const serializedTaskLists = await Promise.all(tasks.map(async (task) => await serializer.serializeTask(task)));

    baseResponse.success = true;
    baseResponse.data = serializedTaskLists;
    return NextResponse.json(baseResponse, { status: 200 });
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}
