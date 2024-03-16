import { useRouter } from "next/navigation";
import ChoiceButton from "@/components/Buttons/ChoiceButton";
import React from "react";
import ChoicesLayout from "@/components/Layout/ChoicesLayout";
import QuizLayout from "@/components/Layout/QuizLayout";
import ResultLayout from "@/components/Layout/ResultLayout";
const getQuestion = async (id: string) => {
    const question = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/survey/question?id=${id}`,
        {
            cache: "no-store",
        }
    );
    return question.json();
};

const QuizPage = async ({ params }: any) => {
    const { id } = params;
    const data = (await getQuestion(id)).data;

    return data ? (
        data.question === "FINISHED" ? (
            <ResultLayout data={data} session_id={id} />
        ) : (
            <QuizLayout data={data} session_id={id} />
        )
    ) : (
        "Quiz is not valid"
    );
};

export default QuizPage;
