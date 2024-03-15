import Image from "next/image";
import React from "react";

const RPGLayout = ({ data, session_id, loading, setLoading }: any) => {
    return (
        <div className="w-full flex items-center justify-center m-auto max-w-screen-md h-full flex-grow bg-white rounded-2xl">
            <Image src="/assets/omori-transparent.gif" alt="Portrait" className="h-full w-auto"width={400} height={400}/>
        </div>
    );
};

export default RPGLayout;
