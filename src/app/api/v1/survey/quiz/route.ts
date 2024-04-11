import connectDatabase from "@/lib/connect-db";
import { quizCalculatePoints, quizGenerateImage } from "@/lib/server-quiz";
import QuizReport from "@/model/QuizReport";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDatabase();
    const resData = await req.json();
    if (!resData)
        return Response.json({ statusCode: 400, error: "Invalid Request" });

    const user: any = resData?.user;
    const answers: any = resData?.answers;

    try {
        const points = await quizCalculatePoints(answers);
        const doc = new QuizReport({
            user: user,
            answers: answers,
            points: points,
        });
        const result = await doc.save();
        return Response.json({ statusCode: 200, data: result });
    } catch (error) {
        console.error(error);
        return Response.json({ statusCode: 400, error: error });
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
    await connectDatabase();
    try {
        const { searchParams } = new URL(req.url);
        const resultId = searchParams.get("id");
        if (!resultId)
            return Response.json({
                statusCode: 400,
                error: "Result ID Not Found!",
            });

        const result = await QuizReport.findById(resultId);
        if (!result)
            return Response.json({
                statusCode: 400,
                error: "Result Not Found",
            });

        const image_url = await quizGenerateImage(result);
        return Response.json({
            statusCode: 200,
            data: { result: result, image_url },
        });
    } catch (error) {
        console.error(error);
        return Response.json({ statusCode: 400, error: error });
    }
}
