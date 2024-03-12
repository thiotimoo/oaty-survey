"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ChoicesLayout from "./ChoicesLayout";

const QuizLayout = ({ data, session_id }: any) => {
    const [loading, setLoading] = useState(false);
    const handlerLoading = (data: boolean) => {
        setLoading(data)
    }
    useEffect(()=> {
        handlerLoading(false);
    }, [data])
    return (
        <motion.div
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }} className="flex flex-col gap-4 h-full justify-center items-center min-h-svh">
            <h2 className="font-bold text-2xl text-center p-6">{data.question}</h2>
            <ChoicesLayout data={data} session_id={session_id} loading={loading} setLoading={handlerLoading} />
        </motion.div>
    );
};

export default QuizLayout;
