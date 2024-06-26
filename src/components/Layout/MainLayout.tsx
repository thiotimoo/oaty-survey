"use client";
import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import NewQuizButton from "../Buttons/NewQuizButton";
import Image from "next/image";
import LoadingLayout from "./LoadingLayout";

const MainLayout = () => {
    const [loading, setLoading] = useState();
    const handleLoading = (newState: any) => {
        setLoading(newState);
    };
    return (
        <main className="h-full md:p-6 w-full">
            <AnimatePresence mode="wait">
                <motion.div
                    key={loading}
                    className="min-h-svh h-full w-full flex flex-col items-center justify-center max-w-screen-sm m-auto gap-4 py-8 overflow-x-hidden"
                    initial="hidden"
                    animate="enter"
                    exit="exit"
                    variants={{
                        hidden: { opacity: 0, x: 0 },
                        enter: { opacity: 1, x: 0 },
                        exit: { opacity: 0, x: -200 },
                    }}
                    transition={{ type: "spring", stiffness: 100 }}
                >
                    {!loading ? (
                        <>
                            <div>
                                <Image
                                    alt="OATY"
                                    src={"/assets/icon_light.webp"}
                                    className="h-48 w-auto object-contain p-2  aspect-square m-auto rounded-xl"
                                    width={500}
                                    height={500}
                                />
                                <h2 className="text-center text-lg max-w-screen-sm p-4 font-gabarito font-black">Overthinking Assessment<br/>for Teens Yosuka</h2>
                            </div>
                            <NewQuizButton
                                loading={loading}
                                handleLoading={handleLoading}
                            />
                            <p className="text-xs text-center leading-loose max-w-sm">Quiz overthinking yang terinspirasi dari MBTI types, Cosmos persona, Cake resume, dll.</p>
                        </>
                    ) : (
                        <LoadingLayout />
                    )}
                </motion.div>
            </AnimatePresence>
        </main>
    );
};

export default MainLayout;
