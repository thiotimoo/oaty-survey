import Image from "next/image";
import React from "react";
import ExitQuizButton from "../Buttons/ExitQuizButton";

const TopLayout = ({ data, scenario, loading, setLoading }: any) => {
    const questionNum = scenario.replace(/\D/g, "");
    const completionPercent = Math.floor(
        (Number.parseInt(questionNum) / 22) * 100
    );
    return (
        <div className="flex flex-col w-full p-2">
            <div className="w-full rounded-full bg-zinc-400 h-2 flex items-start justify-start">
                <div
                    className={`rounded-full bg-zinc-900 h-2 transition-all`}
                    style={{ width: completionPercent + "%" }}
                />
            </div>
            <div className="flex flex-row w-full items-center justify-between">
                <div className="flex-1 flex items-center justify-start">
                    <ExitQuizButton loading={loading} setLoading={setLoading} />
                </div>
                <Image
                    src="/assets/icon_light.png"
                    className="h-16 w-auto"
                    alt="OATY"
                    width={200}
                    height={200}
                />
                <div className="flex-1 flex items-center justify-end">
                    <p className="px-6 py-2 font-bold font-mono mx-2 text-sm tracking-widest text-center font-space">
                        # {scenario}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TopLayout;
