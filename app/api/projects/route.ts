import { NextRequest, NextResponse } from "next/server";
import connect from "../../../db";
import Project, { ProjectDbType, ProjectType } from "../../../models/project";
import serializer from "../../../serializers/project";
import { BaseResponseType } from "../BaseResponse";

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
