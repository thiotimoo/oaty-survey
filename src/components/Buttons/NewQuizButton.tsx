"use client";
import { createSession } from "@/lib/client-quiz";
import { useRouter } from "next/navigation";
import React from "react";

const NewQuizButton = () => {
    const router = useRouter();
    const handleNewQuiz = async () => {
        const session_id = await createSession();
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/quiz/${session_id}`);
    };
    return <button onClick={handleNewQuiz}>PLAY</button>;
};

export default NewQuizButton;
