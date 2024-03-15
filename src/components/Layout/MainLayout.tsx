"use client"
import React, { useEffect, useState } from "react";
import NewQuizButton from "../Buttons/NewQuizButton";
import Image from "next/image";

const MainLayout = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const handleLoading = (data: boolean) => {
        setLoading(data);
    };

    useEffect(() => {
        handleLoading(false);
    }, [data]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <Image alt="OATY" src={"/assets/logo_light.png"} className="h-96 w-full object-contain" width={1649} height={1649}/>
            <NewQuizButton loading={loading} setLoading={handleLoading} />
        </main>
    );
};

export default MainLayout;
