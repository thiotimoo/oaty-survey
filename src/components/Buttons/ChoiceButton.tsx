"use client";
import { answerQuestion } from "@/lib/client-quiz";
import { useRouter } from "next/navigation";
import React from "react";

const ChoiceButton = ({ choice, index, session_id }: any) => {
    const router = useRouter();
    const onAnswer = async (choice: number) => {
        const res = await answerQuestion(session_id, choice);
        if (res) {
            router.refresh();
        }
    };
    return (
        <button
            key={index}
            className="bg-red-400 m-2"
            onClick={() => onAnswer(index)}
        >
            <h2>{choice.body}</h2>
            <h2>{choice.points}</h2>
            <h2>{choice.next}</h2>
        </button>
    );
};

export default ChoiceButton;
