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
    handleScenario
}: any) => {
    const router = useRouter();
    const onAnswer = async (choice: number) => {
        handleAnswers({scenario: scenario, choice: choice},data.choices[choice].nextQuestion);
        /*if (res) {
            router.refresh();
            
            //setLoading(false);
        }*/
    };
    let bgButton = "";
    switch (index) {
        case 0:
            bgButton = "bg-red-900";
            break;
        case 1:
            bgButton = "bg-blue-900";
            break;
        case 2:
            bgButton = "bg-green-900";
            break;
        case 3:
            bgButton = "bg-yellow-400";
            break;
    }

    return (
        <motion.button
            key={index}
            whileTap={{ scale: 0.9 }}
            
            className={`flex flex-row justify-center items-center text-center text-lg gap-2 bg-white hover:bg-black hover:text-white text-black ps-8 pe-6 py-4 rounded-2xl w-full ${bgButton}`}
            onClick={() => onAnswer(index)}
        >
            <h2>{choice.body}</h2>
            {/* <h2>{choice.points}</h2> */}
            {/* <h2>{choice.next}</h2> */}
        </motion.button>
    );
};

export default ChoiceButton;
