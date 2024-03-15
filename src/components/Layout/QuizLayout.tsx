"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ChoicesLayout from "./ChoicesLayout";
import QuestionLayout from "./QuestionLayout";
import TopLayout from "./TopLayout";
import RPGLayout from "./RPGLayout";

const QuizLayout = ({ data, session_id }: any) => {
    const [loading, setLoading] = useState(false);
    const handleLoading = (data: boolean) => {
        setLoading(data)
    }

    useEffect(()=> {
        handleLoading(false);
    }, [data])
    return (
        <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }} className="flex flex-col gap-4 h-full min-h-svh justify-center items-center">
            <TopLayout data={data} session_id={session_id} loading={loading} setLoading={handleLoading}/>
            <RPGLayout data={data} session_id={session_id} loading={loading} setLoading={handleLoading}/>
            <QuestionLayout data={data} session_id={session_id} loading={loading} setLoading={handleLoading}/>
            <ChoicesLayout data={data} session_id={session_id} loading={loading} setLoading={handleLoading} />
        </motion.div>
    );
};

export default QuizLayout;
