import Image from "next/image";
import React from "react";
import SaveButton from "../Buttons/SaveButton";
const getResult = async (id: string) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/survey/quiz?id=${id}`,
        {
            cache: "no-store",
        }
    );
    return result.json();
};

const ResultLayout = async ({ result_id }: any) => {
    const data = (await getResult(result_id)).data;
    const result = data.result
    console.log(result)
    return result ? (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="flex-grow p-6">
                <div className="flex-grow bg-yellow-100 outline outline-black border-inherit rounded-2xl w-auto h-full flex items-center justify-center relative max-w-screen-sm">
                    <Image
                        src={data.image_url}
                        alt={data.image_url}
                        width={1080}
                        height={1920}
                        unoptimized
                        className="rounded-2xl overflow-clip h-full w-auto object-contain bg-red-500"
                    />
                </div>
            </div>
            <SaveButton result={result}/>
            <h2>{result.user.username}</h2>
            <h2>{result.user.school}</h2>
            <h2>{result.points}</h2>
        </div>
    ) : (
        "Result not found"
    );
};

export default ResultLayout;
