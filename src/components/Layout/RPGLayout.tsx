import Image from "next/image";
import React from "react";

const RPGLayout = ({ data, session_id, loading, setLoading }: any) => {
    return (
        <div className="flex items-center justify-center px-4 w-full max-w-screen-md h-full flex-grow ">
            <div className="bg-yellow-100 outline outline-black border-inherit rounded-2xl w-full h-full flex items-center justify-center relative overflow-clip">
                <Image
                    src="/assets/bg1.jpg"
                    alt="Portrait"
                    className="h-full w-full absolute object-cover rounded-2xl"
                    width={400}
                    height={200}
                />
                <Image
                    src="/assets/omori-transparent.gif"
                    alt="Portrait"
                    className="h-full w-auto z-10"
                    width={400}
                    height={400}
                />
            </div>
        </div>
    );
};

export default RPGLayout;
