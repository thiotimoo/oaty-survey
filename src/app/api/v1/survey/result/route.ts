import connectDatabase from "@/lib/connect-db";
import { getQuestion } from "@/lib/questions";
import { createCanvas, loadImage, registerFont } from "canvas";
import QuizResult from "@/model/QuizResult";
import QuizSession from "@/model/QuizSession";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

registerFont(path.join(process.cwd(), "/data/assets/fonts/Jua-Regular.ttf"), {
    family: "Jua",
});

async function generateImage(result: any) {
    console.log("pen down");
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
    ctx.fillText(result.username, 100, 125);

    ctx.font = "30px Jua";
    ctx.textAlign = "left";
    ctx.fillText(result.id, 100, 165);
    return canvas.toDataURL();
}

export async function GET(req: NextRequest, res: NextResponse) {
    await connectDatabase();

    const { searchParams } = new URL(req.url);
    //const id = searchParams.get("id") || "1A";
    const sessionId = searchParams.get("id");
    if (!sessionId)
        return Response.json({
            statusCode: 400,
            error: "Session ID Not Found!",
        });
    try {
        const result = await QuizResult.findById(sessionId);
        if (result) {
            const image_url = await generateImage(result);
            return Response.json({
                statusCode: 200,
                data: { result, image_url },
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
