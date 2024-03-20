"use client";
import { cubicBezier, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import NewQuizButton from "../Buttons/NewQuizButton";
import Image from "next/image";
const MarqueeSpan = ({ children }: any) => {
    return (
        <span className="text-base mx-4 selection:bg-black selection:text-white font-bold">
            {children}
        </span>
    );
};

const MarqueeDivider = () => {
    return (
        <span className="text-base mx-4 text-zinc-600 selection:bg-white selection:text-black">
            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <>{'//'}</>
        </span>
    );
};
const MainLayout = () => {
    return (
        <main className="min-h-svh md:p-6 w-full">
            <div className="h-full w-full flex flex-col items-center justify-center max-w-screen-sm m-auto gap-4 py-8 overflow-x-hidden">
                <div>
                    <Image
                        alt="OATY"
                        src={"/assets/logo_light.png"}
                        className="h-48 w-full object-contain p-2"
                        width={500}
                        height={500}
                    />
                </div>

                <div className="bg-white text-black w-full shadow-lg py-2 md:rounded-md rounded-none">
                    <div className="relative overflow-x-hidden font-space uppercase w-full flex">
                        <div className="animate-marquee whitespace-nowrap">
                            <MarqueeSpan>Tika 🍊</MarqueeSpan>
                            <MarqueeDivider />
                            <MarqueeSpan>Pito 🌙</MarqueeSpan>
                            <MarqueeDivider />
                            <MarqueeSpan>Livina 🌸</MarqueeSpan>
                            <MarqueeDivider />
                            <MarqueeSpan>Rira 🍁</MarqueeSpan>
                            <MarqueeDivider />
                            <MarqueeSpan>Wila 🌿</MarqueeSpan>
                            <MarqueeDivider />
                        </div>

                        <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
                            <MarqueeSpan>Tika 🍊</MarqueeSpan>
                            <MarqueeDivider />
                            <MarqueeSpan>Pito 🌙</MarqueeSpan>
                            <MarqueeDivider />
                            <MarqueeSpan>Livina 🌸</MarqueeSpan>
                            <MarqueeDivider />
                            <MarqueeSpan>Rira 🍁</MarqueeSpan>
                            <MarqueeDivider />
                            <MarqueeSpan>Wila 🌿</MarqueeSpan>
                            <MarqueeDivider />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row px-2">
                    <Image
                        src="/assets/bruce_lee.webp"
                        alt="Bruce Lee"
                        width={200}
                        height={200}
                        className="rounded-lg shadow-lg aspect-square object-cover object-top md:w-64 md:h-64 w-32 h-32 hidden md:block"
                    />
                    <div className="flex flex-col md:p-6 px-4 justify-start items-start gap-2 h-full">
                        <div className="rounded-lg shadow-lg bg-white p-6 gap-4 flex flex-col">
                            <Image
                                src="/assets/bruce_lee.webp"
                                alt="Bruce Lee"
                                width={200}
                                height={200}
                                className="rounded-lg shadow-lg aspect-square object-cover object-top md:w-64 md:h-64 w-32 h-32 block md:hidden"
                            />
                            <p className="md:text-xl text-lg leading-relaxed ">
                                &quot;Jika kamu menghabiskan terlalu banyak
                                waktu untuk memikirkan sesuatu, kamu tidak akan
                                pernah menyelesaikannya.&quot;
                                <span className="font-bold md:hidden inline-block">
                                    - Bruce Lee
                                </span>
                            </p>
                            <span className="font-bold text-lg text-end md:block hidden">
                                - Bruce Lee
                            </span>
                        </div>
                    </div>
                </div>

                <NewQuizButton />
            </div>
        </main>
    );
};

export default MainLayout;
