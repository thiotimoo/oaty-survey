"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SaveButton from "../Buttons/SaveButton";
import LoadingLayout from "./LoadingLayout";
import RetryQuizButton from "../Buttons/RetryQuizButton";
const getResult = async (id: string) => {
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/survey/quiz?id=${id}`,
        {
            cache: "no-store",
        }
    );
    return result.json();
};

const ResultLayout = ({ result_id }: any) => {
    const [data, setData]: any = useState();
    const [result, setResult]: any = useState();
    const [loading, setLoading] = useState(false);

    const handleLoading = (newState: any) => {
        setLoading(newState)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetched = (await getResult(result_id)).data;
                setData(fetched);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (data != null) {
            setResult(data.result);
        }
    }, [data]);
    return (
        <div className="flex flex-col justify-center items-center min-h-svh max-w-sm m-auto ">
            {result && !loading ? (
            <div className="flex flex-col justify-center items-center min-h-svh max-w-sm m-auto  p-6 gap-4">
                <div className="flex-grow">
                    <div className="flex-grow outline outline-black border-inherit rounded-2xl w-auto h-full flex items-center justify-center relative ">
                        <Image
                            src={data.image_url}
                            alt={data.image_url}
                            width={1080}
                            height={1920}
                            className="rounded-2xl overflow-clip h-full w-auto object-contain bg-red-500"
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                <SaveButton result={result} />
                <RetryQuizButton result={result} handleLoading={handleLoading} />
                </div>
            </div>
            ) : (
            <LoadingLayout />)}
        </div>
    );
};

export default ResultLayout;
