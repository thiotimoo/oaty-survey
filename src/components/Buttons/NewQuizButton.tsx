"use client";
import { createSession } from "@/lib/client-quiz";
import { Play } from "@phosphor-icons/react";
import { PlayCircle } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import React from "react";

const NewQuizButton = ({ loading, setLoading }: any) => {
    const router = useRouter();
    const onNewQuiz = async () => {
        setLoading(true);
        router.push(`/quiz`);
    };
    return (
        <button
            disabled={loading}
            className="flex flex-row gap-4 justify-center items-center bg-red-400 hover:bg-red-200 active:bg-red-50 border-black py-2 px-4 text-4xl tracking-widest uppercase rounded-2xl font-semibold disabled:opacity-20 transition-all border-2 border-b-4 font-mono w-full max-w-screen-md"
            onClick={onNewQuiz}
        >
            <Play weight="fill" />
            Play
        </button>
    );
};

export default NewQuizButton;
