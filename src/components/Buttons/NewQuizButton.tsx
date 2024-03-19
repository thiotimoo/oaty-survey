"use client";
import { motion } from "framer-motion";
import { createSession } from "@/lib/client-quiz";
import { Play } from "@phosphor-icons/react";
import { CaretRight, PlayCircle } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import React from "react";

const NewQuizButton = () => {
    const router = useRouter();
    const onNewQuiz = async () => {
        router.push(`/quiz`);
    };
    return (
        <motion.button
            whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-row justify-center items-center text-center text-xl gap-2 bg-black text-white ps-8 pe-6 py-4 rounded-full"
            onClick={onNewQuiz}
        >
            Start
            <CaretRight size={24} weight="fill" />
        </motion.button>
    );
};

export default NewQuizButton;
