import { useRouter } from "next/navigation";
import ChoiceButton from "@/components/Buttons/ChoiceButton";
import React from "react";
import ChoicesLayout from "@/components/Layout/ChoicesLayout";
import QuizLayout from "@/components/Layout/QuizLayout";
import ResultLayout from "@/components/Layout/ResultLayout";

const ResultPage = async ({ params }: any) => {
    const { id } = params;
    return <ResultLayout result_id={id} />;
};

export default ResultPage;
