import connectDatabase from "@/lib/connect-db";
import { getQuestion, getQuestionChoice } from "@/lib/questions";
import QuizResult from "@/model/QuizResult";
import QuizSession from "@/model/QuizSession";

async function onQuizAnswer(session_id: string, choice: number) {
    try {
        const session = await QuizSession.findById(session_id);
        const choiceData = await getQuestionChoice(
            session.currentQuestion,
            choice
        );
        if (!choiceData)
            return Response.json({ statusCode: 400, error: "Invalid Choice" });

        const update = {
            $inc: { points: choiceData.points },
            currentQuestion: choiceData.nextQuestion,
            finished: false,
        };

        if (choiceData.nextQuestion.startsWith("END")) {
            // Generate final result
            update.finished = true;
            const updated_session = await QuizSession.findByIdAndUpdate(
                session_id,
                update
            );

            const data = {
                _id: session_id,
                username: session.username,
                points: session.points,
            };

            await QuizResult.findByIdAndUpdate(session_id, data, {
                upsert: true,
            });
            return Response.json({ statusCode: 200, data: updated_session });
        } else {
            const updated_session = await QuizSession.findByIdAndUpdate(
                session_id,
                update
            );

            return Response.json({ statusCode: 200, data: updated_session });
        }
    } catch (error) {
        return Response.json({ statusCode: 400, error: error });
    }
}

export async function POST(req: Request) {
    await connectDatabase();
    const resData = await req.json();
    if (!resData)
        return Response.json({ statusCode: 400, error: "Invalid Request" });

    const action_type = resData?.type?.toString();
    const session_id = resData?.session_id?.toString();

    if (!action_type)
        return Response.json({ statusCode: 400, error: "Invalid Action Type" });
    if (!session_id)
        return Response.json({ statusCode: 400, error: "Invalid Session ID" });

    switch (action_type) {
        case "ANSWER":
            const choice = Number.parseInt(resData?.choice?.toString() || "-1");
            if (choice == null || choice == -1)
                return Response.json({
                    statusCode: 40,
                    type: action_type,
                    error: "Invalid Choice",
                });

            return onQuizAnswer(session_id, choice);
        default:
            return Response.json({
                statusCode: 400,
                error: "Invalid Action Type",
            });
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
