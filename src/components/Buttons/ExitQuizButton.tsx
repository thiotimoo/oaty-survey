import { X } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import React from "react";

const ExitQuizButton = ({ loading, setLoading }: any) => {
    const router = useRouter();
    const onExitQuiz = async () => {
        router.replace(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    };
    return (
        <button
            className="p-2 mx-2 hover:bg-black active:bg-zinc-400 group rounded-full transition-all"
            onClick={onExitQuiz}
        >
            <X weight="bold" size={24} className="group-hover:fill-white" />
        </button>
    );
};

export default ExitQuizButton;
