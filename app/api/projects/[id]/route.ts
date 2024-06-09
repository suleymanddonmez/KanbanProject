import { NextRequest, NextResponse } from "next/server";
import connect from "../../../../db";
import Project, { ProjectDbType, ProjectType } from "../../../../models/project";
import serializer from "../../../../serializers/project";
import { BaseResponseType } from "../../BaseResponse";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  let baseResponse: BaseResponseType<ProjectType> = {
    success: false,
  };
  try {
    const { id } = params;
    if (!id) {
      throw new Error("Project id required!");
    }
    await connect();
    const project: ProjectDbType | null = await Project.findById(id);
    if (!project) {
      throw new Error("Project not found!");
    }
    const serializedProject = await serializer.serializeProjectWithTaskLists(project, new URL(request.url).origin);

    baseResponse.success = true;
    baseResponse.data = serializedProject;
    return NextResponse.json(baseResponse, { status: 200 });
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}
