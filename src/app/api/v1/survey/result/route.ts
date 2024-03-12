import connectDatabase from "@/lib/connect-db";
import { getQuestion } from "@/lib/questions";
import QuizResult from "@/model/QuizResult";
import QuizSession from "@/model/QuizSession";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    await connectDatabase();

    const { searchParams } = new URL(req.url);
    //const id = searchParams.get("id") || "1A";
    const sessionId = searchParams.get("id") || "";

    try {
        const result = await QuizResult.findById(sessionId);
        if (result) {
            return Response.json({
                statusCode: 200,
                data: result,
            });
        } else {
            return Response.json({
                statusCode: 400,
                error: "Result Not Found",
            });
        }
    } catch (error) {
        console.error(error);
        return Response.json({ statusCode: 400, error: error });
    }
}
