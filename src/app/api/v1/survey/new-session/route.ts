import connectDatabase from "@/lib/connect-db";
import QuizSession from "@/model/QuizSession";

export async function POST(req: Request) {
    await connectDatabase();
    let formData;
    try {
        formData = await req.formData();
    } catch(error) {
        formData = null;
    }

    const username = formData?.get('username')?.toString() || "Anonymous";
    console.log(username)
    const new_session = new QuizSession({
        username: username,
        currentQuestion: "1A",
        points: 0,
        finished: false,
    });

    try {
        const session = await new_session.save();
        return Response.json({ statusCode: 200, data: session });
    } catch (error) {
        console.log(error);
        return Response.json({ statusCode: 400, error: error });
    }
}

export async function GET(req: Request, res: Response) {
    await connectDatabase();
    try {
        return Response.json({ statusCode: 200, data: "New Session" });
    } catch (error) {
        console.log(error);
        return Response.json({ statusCode: 400, error: error });
    }
}
