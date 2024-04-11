import React from "react";
import ResultLayout from "@/components/Layout/ResultLayout";

const ResultPage = async ({ params }: any) => {
    const { id } = params;
    return <ResultLayout result_id={id} />;
};

export default ResultPage;
