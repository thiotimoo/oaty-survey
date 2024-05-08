import connectDatabase from "@/lib/connect-db";
import { getAllQuestions, getQuestion } from "@/lib/questions";
import QuizReport from "@/model/QuizReport";
import QuizSession from "@/model/QuizSession";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.SECRET_KEY;

export async function GET(req: NextRequest, res: NextResponse) {
    await connectDatabase();
    try {
        const { searchParams } = new URL(req.url);
        const resultId = searchParams.get("secret");
        if (resultId !== SECRET_KEY)
            return Response.json({
                statusCode: 400,
                error: "Secret key is incorrect",
            });

        const result = await QuizReport.find();
        if (!result)
            return Response.json({
                statusCode: 400,
                error: "Result Not Found",
            });
        const cleanResult = result.map((item) => {
            return {
                user: {
                    name: item?.user?.username,
                    school: item?.user?.school,
                    class: item?.user?.class,
                    age: item?.user?.age,
                    gender: item?.user?.gender,
                },
                answers: item?.answers,
                points: item?.points,
                createdAt: item?.createdAt,
                id: item._id,
            };
        });
        return Response.json({
            statusCode: 200,
            data: cleanResult,
        });
    } catch (error) {
        console.error(error);
        return Response.json({ statusCode: 400, error: error });
    }
}
