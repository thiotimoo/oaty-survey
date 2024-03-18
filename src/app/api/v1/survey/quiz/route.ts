import connectDatabase from "@/lib/connect-db";
import { getAllQuestions } from "@/lib/questions";
import QuizReport from "@/model/QuizReport";
import { createCanvas, loadImage, registerFont } from "canvas";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

registerFont(path.join(process.cwd(), "/data/assets/fonts/Jua-Regular.ttf"), {
    family: "Jua",
});

async function onQuizSubmit(user: any, answers: any) {
    try {
        const allQuestion = await getAllQuestions();
        let points = 0;
        for (let i = 0; i < answers.length; i++){
            const answer = answers[i];
            const choice = allQuestion[answer.scenario].choices[answer.choice];
            points += choice.points
        }
        const doc = new QuizReport({
            user: user,
            answers: answers,
            points: points,
        });
        const result = await doc.save();
        return Response.json({ statusCode: 200, data: result });
    } catch (error) {
        console.error(error)
        return Response.json({ statusCode: 400, error: error });
    }
}

export async function POST(req: Request) {
    await connectDatabase();
    const resData = await req.json();
    if (!resData)
        return Response.json({ statusCode: 400, error: "Invalid Request" });
    const user: any = resData?.user;
    
    const action_type = resData?.type?.toString();

    if (!action_type)
        return Response.json({ statusCode: 400, error: "Invalid Action Type" });

    switch (action_type) {
        case "SUBMIT":
            const answers: any = resData?.answers;
            return onQuizSubmit(user, answers);
        default:
            return Response.json({
                statusCode: 400,
                error: "Invalid Action Type",
            });
    }
}

async function generateImage(result: any) {
    const canvas = createCanvas(1080, 1920);
    const ctx = canvas.getContext("2d");

    // Draw line under text

    // Draw cat with lime helmet
    const image = await loadImage(
        path.join(process.cwd(), "/data/assets/result-ovito.jpg")
    );
    ctx.drawImage(image, 0, 0, 1080, 1920);
    // Write "Awesome!"
    ctx.font = "40px Jua";
    ctx.textAlign = "left";
    ctx.fillText(result.user.username, 100, 125);

    ctx.font = "30px Jua";
    ctx.textAlign = "left";
    ctx.fillText(result.id, 100, 165);
    return canvas.toDataURL();
}

export async function GET(req: NextRequest, res: NextResponse) {
    await connectDatabase();

    const { searchParams } = new URL(req.url);
    //const id = searchParams.get("id") || "1A";
    const resultId = searchParams.get("id");
    if (!resultId)
        return Response.json({
            statusCode: 400,
            error: "Result ID Not Found!",
        });
    try {
        const result = await QuizReport.findById(resultId);
        if (result) {
            
            const image_url = await generateImage(result);
            return Response.json({
                statusCode: 200,
                data: { result: result, image_url },
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
