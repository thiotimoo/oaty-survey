"use client";
import { Download } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const SaveButton = ({ result, session_id, loading, setLoading }: any) => {
    const download = (filename: any, content: any) => {
        var element = document.createElement("a");
        element.setAttribute("href", content);
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };

    const handleDownload = async (e: any) => {
        try {
            const res = await fetch(result.image_url, {
                method: "GET",
                headers: {},
            });
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            download("test", url);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <button
                disabled={loading}
                className="flex flex-row gap-4 justify-center items-center bg-red-400 hover:bg-red-200 active:bg-red-50 border-black py-2 px-4 text-4xl tracking-widest uppercase rounded-2xl font-semibold disabled:opacity-20 transition-all border-2 border-b-4 font-mono w-full max-w-screen-sm"
                onClick={handleDownload}
                type="button"
            >
                <Download weight="fill"/>
                Save Image
            </button>
        </div>
    );
};

export default SaveButton;
