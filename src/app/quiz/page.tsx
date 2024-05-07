import { useRouter } from "next/navigation";
import ChoiceButton from "@/components/Buttons/ChoiceButton";
import React from "react";
import QuizLayout from "@/components/Layout/QuizLayout";
import Head from "next/head";

const QuizPage = async ({ params }: any) => {
    return (
        <>
            <Head>
                <link rel="preload" href="/assets/omori-transparent.webp" as="image" />
                <link rel="preload" href="/assets/female-transparent.webp" as="image" />
                <link rel="preload" href="/backgrounds/bg1.webp" as="image" />
                <link rel="preload" href="/backgrounds/bg2.webp" as="image" />
                <link rel="preload" href="/backgrounds/bg3.webp" as="image" />
                <link rel="preload" href="/backgrounds/bg4.webp" as="image" />
                <link rel="preload" href="/backgrounds/bg5.webp" as="image" />
                <link rel="preload" href="/backgrounds/bg6.webp" as="image" />
            </Head>
            <QuizLayout />
        </>
    );
};

export default QuizPage;
