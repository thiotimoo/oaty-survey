import React from "react";

const QuestionLayout = ({ data, session_id, loading, setLoading }: any) => {
    return (
        <div className="w-full flex items-center justify-center flex-1 max-w-screen-lg">
            <h2 className="font-bold text-2xl text-center p-6 ">
                {data.question}
            </h2>
        </div>
    );
};

export default QuestionLayout;
