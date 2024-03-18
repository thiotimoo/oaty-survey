import connectDatabase from "@/lib/connect-db";
import { getAllQuestions, getQuestion } from "@/lib/questions";
import QuizSession from "@/model/QuizSession";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    await connectDatabase();

    try {
        return Response.json({
            statusCode: 200,
            data: await getAllQuestions(),
        });
    } catch (error) {
        console.error(error);
        return Response.json({ statusCode: 400, error: error });
    }
}
