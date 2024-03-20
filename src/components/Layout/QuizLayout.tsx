"use client";
import { AnimatePresence, cubicBezier, delay, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ChoicesLayout from "./ChoicesLayout";
import QuestionLayout from "./QuestionLayout";
import TopLayout from "./TopLayout";
import RPGLayout from "./RPGLayout";
import { fetchAllQuestions, submitQuiz } from "@/lib/client-quiz";
import { useRouter } from "next/navigation";
import FormLayout from "./FormLayout";
import Image from "next/image";

const QuizLayout = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [scenario, setScenario] = useState("1A");
    const [countAnswer, setCountAnswer] = useState(1);
    const [user, setUser] = useState({
        username: "budi",
        gender: 0,
    });
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
            const quiz = await submitQuiz(user, answers);
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
                const allQuestions = await fetchAllQuestions();
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
            console.log("mewing", questionData);
        }
    }, [scenario, collection]);
    useEffect(() => {
        console.log(answers);
    }, [answers]);

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
                        exit: { opacity: 0, x: 0 },
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
                                    hidden: { opacity: 0, x: -200 },
                                    enter: { opacity: 1, x: 0 },
                                    exit: { opacity: 0, x: 0 },
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
                                            className="w-full h-full -z-10 object-cover max-w-screen-sm rounded-xl"
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
                            <motion.div
                                initial={{ y: 0, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                    ease: cubicBezier(0.25, 0.1, 0.25, 1),
                                }}
                                role="status"
                                className="m-auto"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-8 h-8 text-zinc-400 animate-spin fill-zinc-900"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </motion.div>
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
