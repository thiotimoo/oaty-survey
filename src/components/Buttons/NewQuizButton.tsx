"use client";
import { createSession } from "@/lib/client-quiz";
import { PlayCircle } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import React from "react";

const NewQuizButton = ({ loading, setLoading }: any) => {
    const router = useRouter();
    const onNewQuiz = async () => {
        setLoading(true);
        const session_id = await createSession();
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/quiz/${session_id}`);
    };
    return (
        <button
            disabled={loading}
            className="flex flex-row gap-4 justify-center items-center bg-red-400 hover:bg-red-200 active:bg-red-50 border-red-200 py-2 px-4 text-2xl tracking-widest uppercase rounded-2xl font-semibold disabled:opacity-20 transition-all border-2 border-b-4 "
            onClick={onNewQuiz}
        >
            <PlayCircle weight="fill" />
            Play
        </button>
    );
};

export default NewQuizButton;
