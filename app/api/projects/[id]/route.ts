import { NextRequest, NextResponse } from "next/server";
import connect from "../../../../db";
import Project, { ProjectDbType, ProjectType } from "../../../../models/project";
import serializer from "../../../../serializers/project";
import { BaseResponseType, fetchApi } from "../../BaseActions";

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
    const project = await Project.findById(id);
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  let baseResponse: BaseResponseType<ProjectType> = {
    success: false,
  };
  try {
    const { id } = params;
    if (!id) {
      throw new Error("Project id required!");
    }
    await connect();
    const project = await Project.findByIdAndDelete(id);
    const serializedProject = await serializer.serializeProjectWithTaskLists(project, new URL(request.url).origin);
    // delete related tasks
    if (serializedProject.items?.length > 0) {
      const deleteResult = await fetchApi(`${new URL(request.url).origin}/api/taskLists/filter/${serializedProject.id}`, "DELETE");
    }

    baseResponse.success = true;
    baseResponse.data = serializedProject;
    return NextResponse.json(baseResponse, { status: 200 });
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  let baseResponse: BaseResponseType<ProjectType> = {
    success: false,
  };
  try {
    const { id } = params;
    if (!id) {
      throw new Error("Project id required!");
    }
    const requestBody = await request.json();
    const project = requestBody.project as ProjectType;
    if (!project) {
      throw new Error("Project info required!");
    }
    await connect();
    const projectData = await Project.findById(id);
    const serializedProjectData = await serializer.serializeProjectWithTaskLists(projectData, new URL(request.url).origin);
    if (!projectData) {
      throw new Error("Project not found!");
    }

    if (project.items?.length > 0) {
      for (const taskList of project.items) {
        let isExist = serializedProjectData.items.find((tl) => tl.id == taskList.id);
        if (isExist) {
          if (taskList.items?.length > 0) {
            let patchResult = await Promise.all(
              taskList.items.map(
                async (taskInfo, index) =>
                  await fetchApi(`${new URL(request.url).origin}/api/tasks/${taskInfo.id}`, "PATCH", {
                    task: taskInfo,
                    order: index,
                  })
              )
            );
          }
        }
      }
    }

    baseResponse.success = true;
    baseResponse.data = project;
    return NextResponse.json(baseResponse, { status: 200 });
  } catch (error) {
    baseResponse.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json(baseResponse, { status: 400 });
  }
}
