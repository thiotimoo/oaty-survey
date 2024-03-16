import Image from "next/image";
import React from "react";
import SaveButton from "../Buttons/SaveButton";
const getResult = async (id: string) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/survey/result?id=${id}`,
        {
            cache: "no-store",
        }
    );
    return result.json();
};

const ResultLayout = async ({ data, session_id }: any) => {
    const result = (await getResult(session_id)).data;
    return result ? (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="flex-grow p-6">
                <div className="flex-grow bg-yellow-100 outline outline-black border-inherit rounded-2xl w-auto h-full flex items-center justify-center relative max-w-screen-sm">
                    <Image
                        src={result.image_url}
                        alt={result.image_url}
                        width={1080}
                        height={1920}
                        unoptimized
                        className="rounded-2xl overflow-clip h-full w-auto object-contain bg-red-500"
                    />
                </div>
            </div>
            <SaveButton result={result}/>
            <h2>{data.ending}</h2>
            <h2>{result.result.points}</h2>
        </div>
    ) : (
        "Result not found"
    );
};

export default ResultLayout;
