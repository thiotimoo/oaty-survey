"use client";

import { answerQuestion } from "@/lib/client-quiz";
import { useRouter } from "next/navigation";
import React from "react";

const ChoiceButton = ({
    data,
    choice,
    index,
    session_id,
    loading,
    setLoading,
}: any) => {
    const router = useRouter();
    const onAnswer = async (choice: number) => {
        setLoading(true);
        const res = await answerQuestion(session_id, data.id, choice);
        if (res) {
            router.refresh();
            //setLoading(false);
        }
    };
    let bgButton = "";
    switch (index) {
        case 0:
            bgButton = "bg-red-400 hover:bg-red-200 active:bg-red-50 border-black";
            break;
        case 1:
            bgButton = "bg-blue-400 hover:bg-blue-200 active:bg-blue-50 border-black";
            break;
        case 2:
            bgButton = "bg-green-400 hover:bg-green-200 active:bg-green-50 border-black";
            break;
        case 3:
            bgButton = "bg-yellow-400 hover:bg-yellow-200 active:bg-yellow-50 border-black";
            break;
    }

    return (
        <button
            disabled={loading}
            key={index}
            className={`flex-1 w-full ${bgButton} p-4 rounded-2xl text-lg font-semibold disabled:opacity-20 transition-all border-2 border-b-4 disabled:border-b-2`}
            onClick={() => onAnswer(index)}
        >
            <h2>{choice.body}</h2>
            {/* <h2>{choice.points}</h2> */}
            {/* <h2>{choice.next}</h2> */}
        </button>
    );
};

export default ChoiceButton;
