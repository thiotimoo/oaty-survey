"use client"
import React from "react";
import { cubicBezier, motion } from "framer-motion";

const QuestionLayout = ({ data }: any) => {
    return (
        <motion.div
        initial={{ opacity: 0, y: -90 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -90 }}
        transition={{ ease: cubicBezier(0.25, 0.1, 0.25, 1) }} className="w-full flex items-center justify-center flex-1 max-w-screen-md">
            <h2 className="font-bold text-2xl text-center p-6">
                {data.question}
            </h2>
        </motion.div>
    );
};

export default QuestionLayout;
