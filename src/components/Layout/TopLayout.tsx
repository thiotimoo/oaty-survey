import Image from "next/image";
import React from "react";
import ExitQuizButton from "../Buttons/ExitQuizButton";

const TopLayout = ({ data, session_id, loading, setLoading }: any) => {
    return (
        <div className="flex flex-row w-full p-4 items-center justify-between">
            <ExitQuizButton loading={loading} setLoading={setLoading}/>
            <Image
                src="/assets/icon_light.png"
                className="h-16 w-auto"
                alt="OATY"
                width={200}
                height={200}
            />
            <div>
                <p className="bg-black rounded-full px-4 py-2 text-white font-bold font-mono mx-2">
                    {data.id}
                </p>
            </div>
        </div>
    );
};

export default TopLayout;
