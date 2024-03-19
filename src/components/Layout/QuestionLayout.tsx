"use client";
import React from "react";
import { cubicBezier, motion } from "framer-motion";
import TypewriterComponent from "typewriter-effect";

const QuestionLayout = ({ data }: any) => {
    const handleFinished = () => {};
    return (
        <motion.div
            initial={{ opacity: 0, y: -90 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -90 }}
            transition={{ ease: cubicBezier(0.25, 0.1, 0.25, 1) }}
            className="w-full flex items-center justify-center flex-1 max-w-screen-md"
        >
            <div className="font-bold text-2xl text-center p-6">
                <TypewriterComponent
                    options={{
                        delay: 20,
                        cursor: "",
                    }}
                    onInit={(typewriter) => {
                        typewriter
                            .typeString(data.question)
                            .callFunction(handleFinished)
                            .start();
                    }}
                />
            </div>
        </motion.div>
    );
};

export default QuestionLayout;
