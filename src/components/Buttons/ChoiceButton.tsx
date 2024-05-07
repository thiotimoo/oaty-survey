"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React from "react";

const ChoiceButton = ({
    data,
    choice,
    scenario,
    index,
    handleAnswers,
}: any) => {
    const onAnswer = async (choice: number) => {
        const nextFirstAnswer = { scenario: scenario, choice: 0 };
        const nextFirstScenario = data.choices[0].nextQuestion;
        
        handleAnswers(
            { scenario: scenario, choice: choice },
            data.choices[choice].nextQuestion,
            nextFirstAnswer,
            nextFirstScenario
        );
    };
    let bgButton = "";
    switch (index) {
        case 0:
            bgButton = "bg-blue-900";
            break;
        case 1:
            bgButton = "bg-pink-900";
            break;
        case 2:
            bgButton = "bg-purple-900";
            break;
        case 3:
            bgButton = "bg-green-400";
            break;
    }

    return (
        <motion.button
            key={index}
            whileTap={{ scale: 0.9 }}
            className={`flex flex-row justify-center items-center text-center text-lg gap-2  hover:bg-black hover:text-white text-white ps-8 pe-6 py-4 rounded-2xl w-full ${bgButton}`}
            onClick={() => onAnswer(index)}
        >
            <h2>{choice.body}</h2>
        </motion.button>
    );
};

export default ChoiceButton;
