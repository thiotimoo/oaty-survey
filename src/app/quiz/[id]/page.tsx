import { useRouter } from "next/navigation";
import ChoiceButton from "@/components/Buttons/ChoiceButton";
import React from "react";
import ChoicesLayout from "@/components/Layout/ChoicesLayout";
import QuizLayout from "@/components/Layout/QuizLayout";
const getQuestion = async (id: string) => {
    const question = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/survey/question?id=${id}`,
        {
            cache: "no-store",
        }
    );
    return question.json();
};

const getResult = async (id: string) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/survey/result?id=${id}`,
        {
            cache: "no-store",
        }
    );
    return result.json();
};

const QuizPage = async ({ params }: any) => {
    const { id } = params;
    const data = (await getQuestion(id)).data;

    return data ? (
        data.question === "FINISHED" ? (
            <QuizFinished data={data} session_id={id} />
        ) : (
            <QuizLayout data={data} session_id={id} />
        )
    ) : (
        "Quiz is not valid"
    );
};
const QuizFinished = async ({ data, session_id }: any) => {
    const result = (await getResult(session_id)).data;
    return result ? (
        <div className="flex flex-col">
            <h2>{data.ending}</h2>
            <h2>{result.username}</h2>
            <h2>{result.points}</h2>
        </div>
    ) : "Result not found";
    
};

export default QuizPage;
