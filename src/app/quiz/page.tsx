import { useRouter } from "next/navigation";
import ChoiceButton from "@/components/Buttons/ChoiceButton";
import React from "react";
import ChoicesLayout from "@/components/Layout/ChoicesLayout";
import QuizLayout from "@/components/Layout/QuizLayout";
import ResultLayout from "@/components/Layout/ResultLayout";

const QuizPage = async ({ params }: any) => {
    return <QuizLayout />;
    // return data ? (
    //     data.question === "FINISHED" ? (
    //         <ResultLayout data={data} session_id={id} />
    //     ) : (
            
    //     )
    // ) : (
    //     "Quiz is not valid"
    // );
};

export default QuizPage;
