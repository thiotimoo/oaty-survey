"use client"
import { motion } from "framer-motion";
import React from "react";
import ChoiceButton from "../Buttons/ChoiceButton";

const ChoicesLayout = ({data, session_id, loading, setLoading}: any) => {
    let flexOrientation = "flex-row";
    if (data?.choices?.length > 2)
    flexOrientation = "flex-col"
    return (
        <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex ${flexOrientation} max-w-lg w-full gap-4 p-4`}>
            {data?.choices?.map((choice: any, index: number) => {
                return (
                    <ChoiceButton
                        choice={choice}
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
