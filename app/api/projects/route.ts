import { NextRequest, NextResponse } from "next/server";
import connect from "../../../db";
import Project, { ProjectDbType, ProjectType } from "../../../models/project";
import serializer from "../../../serializers/project";
import { BaseResponseType, fetchApi } from "../BaseActions";

export const defaultTaskLists = ["Backlog", "To do", "In progress", "Designed"];

export async function GET(request: NextRequest) {
  let baseResponse: BaseResponseType<ProjectType[]> = {
    success: false,
  };
  try {
    await connect();
    const projects: ProjectDbType[] = await Project.find();
    const serializedProjects = await Promise.all(projects.map(async (project) => await serializer.serializeProject(project)));
    baseResponse.success = true;
    baseResponse.data = serializedProjects;
    return NextResponse.json(baseResponse, { status: 200 });
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  let baseResponse: BaseResponseType<ProjectType> = {
    success: false,
  };
  const body = await request.json();
  try {
    await connect();
    const project = await Project.create({ title: body.title });
    const serializedProject = await serializer.serializeProject(project);

    //create default taskLists
    try {
      const createTaskLists = await Promise.all(
        defaultTaskLists.map(
          async (taskListTitle) =>
            await fetchApi(`${new URL(request.url).origin}/api/taskLists`, "POST", { title: taskListTitle, projectId: serializedProject.id })
        )
      );
    } catch {}

    baseResponse.success = true;
    baseResponse.data = serializedProject;
    return NextResponse.json(baseResponse, { status: 200 });
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}
