"use client"
import { cubicBezier, motion } from "framer-motion";
import React from "react";
import ChoiceButton from "../Buttons/ChoiceButton";

const ChoicesLayout = ({data, session_id, loading, setLoading}: any) => {
    let flexOrientation = "flex-row";
    if (data?.choices?.length > 2)
    flexOrientation = "flex-col"
    return (
        <motion.div
        initial={{ opacity: 0, x: -90 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -90 }}
        transition={{ ease: cubicBezier(0.25, 0.1, 0.25, 1) }}
        className={`flex ${flexOrientation} max-w-screen-md w-full gap-4 p-4 bg-white rounded-t-2xl`}>
            {data?.choices?.map((choice: any, index: number) => {
                return (
                    <ChoiceButton
                        choice={choice}
                        data={data}
                        key={index}
                        index={index}
                        session_id={session_id}
                        loading={loading}
                        setLoading={setLoading}
                    />
                );
            })}
        </motion.div>
    );
};

export default ChoicesLayout;
