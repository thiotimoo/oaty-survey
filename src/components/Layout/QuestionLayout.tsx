"use client";
import React from "react";
import { cubicBezier, motion } from "framer-motion";
import TypewriterComponent from "typewriter-effect";
import { quizFormatQuestion } from "@/lib/client-quiz";
import { StarFour } from "@phosphor-icons/react/dist/ssr";

const QuestionLayout = ({ data, user, countAnswer, points }: any) => {
    const handleFinished = () => {};
    return (
        <motion.div
            initial={{ opacity: 0, y: -90 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -90 }}
            transition={{ ease: cubicBezier(0.25, 0.1, 0.25, 1) }}
            className="w-full flex items-start justify-start max-w-screen-sm text-white px-4 py-2 "
        >
            <div className="font-bold text-xl text-left px-5 py-3 bg-black w-full m-2 rounded-md">
                <div className="flex flex-row justify-between">
                    <p className="text-base text-neutral-500">
                        Question {countAnswer}
                    </p>
                    <p className="text-base text-black flex flex-row gap-1 justify-center items-center p-1">
                        <StarFour weight="fill"/>
                        {points}
                    </p>
                </div>
                <TypewriterComponent
                    options={{
                        delay: 20,
                        cursor: "",
                    }}
                    onInit={(typewriter) => {
                        typewriter
                            .typeString(
                                quizFormatQuestion(data.question, user.gender)
                            )
                            .callFunction(handleFinished)
                            .start();
                    }}
                />
            </div>
        </motion.div>
    );
};

export default QuestionLayout;
