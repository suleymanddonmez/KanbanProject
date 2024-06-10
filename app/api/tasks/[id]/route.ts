import { NextRequest, NextResponse } from "next/server";
import connect from "../../../../db";
import Task, { TaskDbType, TaskType } from "../../../../models/task";
import serializer from "../../../../serializers/task";
import { BaseResponseType } from "../../BaseActions";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  let baseResponse: BaseResponseType<TaskType> = {
    success: false,
  };
  try {
    const { id } = params;
    if (!id) {
      throw new Error("Task id required!");
    }
    await connect();
    const task = await Task.findById(id);
    const serializedTask = await serializer.serializeTask(task);

    baseResponse.success = true;
    baseResponse.data = serializedTask;
    return NextResponse.json(baseResponse, { status: 200 });
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  let baseResponse: BaseResponseType<TaskType> = {
    success: false,
  };
  try {
    const { id } = params;
    if (!id) {
      throw new Error("Task id required!");
    }
    await connect();
    const task = await Task.findByIdAndDelete(id);
    const serializedTask = await serializer.serializeTask(task);
    baseResponse.success = true;
    baseResponse.data = serializedTask;
    return NextResponse.json(baseResponse, { status: 200 });
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  let baseResponse: BaseResponseType<TaskType> = {
    success: false,
  };
  try {
    const { task, order } = await request.json();
    if (!task) {
      throw new Error("Task info required!");
    }
    await connect();

    if (order) {
      const taskInfo = await Task.findByIdAndUpdate(task.id, { ...task, order: order });
      const serializedTaskInfo = await serializer.serializeTask(taskInfo);
      baseResponse.success = true;
      baseResponse.data = serializedTaskInfo;
    } else {
      const taskInfo = await Task.findByIdAndUpdate(task.id, { ...task });
      const serializedTaskInfo = await serializer.serializeTask(taskInfo);
      baseResponse.success = true;
      baseResponse.data = serializedTaskInfo;
    }

    return NextResponse.json(baseResponse, { status: 200 });
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}
