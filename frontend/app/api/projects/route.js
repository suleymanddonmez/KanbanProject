import { NextResponse } from "next/server";
import connect from "../../../db";
import Project from "../../../models/project";

export const GET = async (request) => {
    try {
        await connect()
        const projects = Project.find();
        return new NextResponse(JSON.stringify(projects), {status: 200})
    }
    catch (error) {
        return new NextResponse("Projeler alınamadı!" + error, {status: 400})
    }
}