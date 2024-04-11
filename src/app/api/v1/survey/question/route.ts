import connectDatabase from "@/lib/connect-db";
import { getQuestion } from "@/lib/questions";
import QuizSession from "@/model/QuizSession";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    await connectDatabase();
    return Response.json({ statusCode: 200, data: "Hello World" });
}

export async function GET(req: NextRequest, res: NextResponse) {
    await connectDatabase();
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("id") || "";

    try {
        const session = await QuizSession.findById(sessionId);
        const id = session.currentQuestion;
        switch (id) {
            case "END1":
            case "END2":
            case "END3":
                return Response.json({
                    statusCode: 200,
                    data: { question: "FINISHED", id: id, ending: id },
                });
            default:
                return Response.json({
                    statusCode: 200,
                    data: await getQuestion(id),
                });
        }
    } catch (error) {
        console.error(error);
        return Response.json({ statusCode: 400, error: error });
    }
}
