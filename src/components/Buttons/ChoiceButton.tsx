"use client";

import { answerQuestion } from "@/lib/client-quiz";
import { useRouter } from "next/navigation";
import React from "react";

const ChoiceButton = ({
    choice,
    index,
    session_id,
    loading,
    setLoading,
}: any) => {
    const router = useRouter();
    const onAnswer = async (choice: number) => {
        setLoading(true);
        const res = await answerQuestion(session_id, choice);
        if (res) {
            setLoading(false);
            router.refresh();
        }
    };
    let bgButton = "";
    switch (index) {
        case 0:
            bgButton = "bg-red-400 hover:bg-red-200 active:bg-red-50 border-red-200";
            break;
        case 1:
            bgButton = "bg-blue-400 hover:bg-blue-200 active:bg-blue-50 border-blue-200";
            break;
        case 2:
            bgButton = "bg-green-400 hover:bg-green-200 active:bg-green-50 border-green-200";
            break;
        case 3:
            bgButton = "bg-yellow-400 hover:bg-yellow-200 active:bg-yellow-50 border-yellow-200";
            break;
    }

    return (
        <button
            disabled={loading}
            key={index}
            className={`flex-1 w-full ${bgButton} p-4 rounded-2xl text-lg font-semibold disabled:opacity-20 transition-all border-2 border-b-4 `}
            onClick={() => onAnswer(index)}
        >
            <h2>{choice.body}</h2>
            {/* <h2>{choice.points}</h2> */}
            {/* <h2>{choice.next}</h2> */}
        </button>
    );
};

export default ChoiceButton;
