"use client";
import { ArrowClockwise, CaretRight, Download } from "@phosphor-icons/react/dist/ssr";
import {motion} from "framer-motion"
import { useRouter } from "next/navigation";
import React from "react";

const RetryQuizButton = ({loading, handleLoading }: any) => {
    const router = useRouter()
    const handleRetry = async (e: any) => {
        handleLoading(true);
        router.replace('/quiz')
    };
    return (
        <div>
            <motion.button
                disabled={loading}
                whileHover={{
                    scale: 1.2,
                    transition: { duration: 1 },
                }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-row justify-center items-center text-center text-lg gap-2 bg-black text-white ps-6 pe-6 py-4 rounded-full"
                onClick={handleRetry}
            >
                <ArrowClockwise size={24} weight="fill" />
                Retry
                
            </motion.button>
        </div>
    );
};

export default RetryQuizButton;
