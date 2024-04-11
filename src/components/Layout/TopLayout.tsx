import Image from "next/image";
import React from "react";
import ExitQuizButton from "../Buttons/ExitQuizButton";

const TopLayout = ({ data, scenario, loading, setLoading }: any) => {
    const questionNum = scenario.replace(/\D/g, "");
    const completionPercent = Math.floor(
        (Number.parseInt(questionNum) / 43) * 100
    );
    return (
        <div className="flex flex-col w-full px-4 pt-2 max-w-screen-sm m-auto">
            <div className="w-full rounded-full bg-zinc-400 h-2 flex items-start justify-start ">
                <div
                    className={`rounded-full bg-zinc-900 h-2 transition-all`}
                    style={{ width: completionPercent + "%" }}
                />
            </div>
        </div>
    );
};

export default TopLayout;
