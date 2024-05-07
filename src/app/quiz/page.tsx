import { useRouter } from "next/navigation";
import ChoiceButton from "@/components/Buttons/ChoiceButton";
import React from "react";
import ChoicesLayout from "@/components/Layout/ChoicesLayout";
import QuizLayout from "@/components/Layout/QuizLayout";
import ResultLayout from "@/components/Layout/ResultLayout";
import Head from "next/head";

const QuizPage = async ({ params }: any) => {
    return (
        <>
            <Head>
                <link rel="preload" href="/assets/backgrounds/omori-transparent.webp" as="image" />
                <link rel="preload" href="/assets/backgrounds/female-transparent.webp" as="image" />
                <link rel="preload" href="/assets/backgrounds/bg1.webp" as="image" />
                <link rel="preload" href="/assets/backgrounds/bg2.webp" as="image" />
                <link rel="preload" href="/assets/backgrounds/bg3.webp" as="image" />
                <link rel="preload" href="/assets/backgrounds/bg4.webp" as="image" />
                <link rel="preload" href="/assets/backgrounds/bg5.webp" as="image" />
                <link rel="preload" href="/assets/backgrounds/bg6.webp" as="image" />
            </Head>
            <QuizLayout />
        </>
    );
};

export default QuizPage;
