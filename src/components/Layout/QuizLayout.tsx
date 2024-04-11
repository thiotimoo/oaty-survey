"use client";
import { AnimatePresence, cubicBezier, delay, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ChoicesLayout from "./ChoicesLayout";
import QuestionLayout from "./QuestionLayout";
import TopLayout from "./TopLayout";
import RPGLayout from "./RPGLayout";
import { useRouter } from "next/navigation";
import FormLayout from "./FormLayout";
import Image from "next/image";
import LoadingLayout from "./LoadingLayout";
import {  quizFetchQuestions, quizClientSubmit } from "@/lib/client-quiz";

const QuizLayout = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [scenario, setScenario] = useState("1A");
    const [countAnswer, setCountAnswer] = useState(1);
    const [user, setUser] = useState();
    const [collection, setCollection]: any = useState();
    const [questionData, setQuestionData]: any = useState();
    const [answers, setAnswers]: any = useState([]);
    const isBrowser = () => typeof window !== "undefined";

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const handleLoading = (newState: any) => {
        setLoading(newState);
    };

    const handleUser = (newUser: any) => {
        setUser(newUser);
    };

    const handleScenario = async (newScenario: any) => {
        setScenario(newScenario);
        setCountAnswer((countAnswer) => countAnswer + 1);
        scrollToTop();
    };

    const handleAnswers = async (newAnswer: any, newScenario: string) => {
        if (newScenario.startsWith("END")) {
            handleLoading(true);
            const quiz = await quizClientSubmit(user, answers);
            if (quiz.statusCode == 200) {
                router.replace(`/result/${quiz.data._id}`);
            } else {
                console.error(quiz.error);
                handleLoading(false);
            }
        } else {
            handleScenario(newScenario);
            setAnswers((oldArray: any) => [...oldArray, newAnswer]);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allQuestions = await quizFetchQuestions();
                setCollection(allQuestions);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (collection != null) {
            let data = collection[scenario];
            setQuestionData(data);
        }
    }, [scenario, collection]);
    const questionNum = scenario.replace(/\D/g, "");
    const questionHue = Math.floor(
        (Number.parseInt(questionNum) / 43) * 100);
    const _hue_filter = "hue-rotate-["+questionHue.toString() + "deg]"
    return user ? (
        questionData && collection && (
            <AnimatePresence mode="wait">
                questionData && collection && (
                <motion.div
                    initial="hidden"
                    animate="enter"
                    exit="exit"
                    variants={{
                        hidden: { opacity: 0, x: 0 },
                        enter: { opacity: 1, x: 0 },
                        exit: { opacity: 0, x: -200 },
                    }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="flex flex-col h-full min-h-svh "
                >
                    <TopLayout data={questionData} scenario={scenario} />

                    <div className="h-full flex-1 flex flex-col">
                        {!loading ? (
                            <motion.div
                                key={scenario}
                                initial="hidden"
                                animate="enter"
                                exit="exit"
                                variants={{
                                    hidden: { opacity: 0, x: 0 },
                                    enter: { opacity: 1, x: 0 },
                                    exit: { opacity: 0, x: -200 },
                                }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="flex-1 flex flex-col items-center h-full"
                            >
                                <div className="-z-10 flex-1 w-full flex flex-col items-center relative">
                                    <div className="w-full h-full absolute -z-10 object-cover max-w-screen-sm rounded-xl px-4 py-2">
                                        <Image
                                            src={"/assets/bg1.jpg"}
                                            width={900}
                                            height={900}
                                            alt="Background"
                                            className={`w-full h-full -z-10 object-cover max-w-screen-sm rounded-xl object-bottom filter ${_hue_filter}`}
                                        />
                                    </div>
                                    <QuestionLayout
                                        countAnswer={countAnswer}
                                        data={questionData}
                                        user={user}
                                    />
                                    <RPGLayout
                                        data={questionData}
                                        user={user}
                                    />
                                </div>
                                <ChoicesLayout
                                    handleAnswers={handleAnswers}
                                    handleScenario={handleScenario}
                                    scenario={scenario}
                                    data={questionData}
                                />
                            </motion.div>
                        ) : (
                            <LoadingLayout />
                        )}
                    </div>
                </motion.div>
                )
            </AnimatePresence>
        )
    ) : (
        <FormLayout handleUser={handleUser} />
    );
};

export default QuizLayout;
