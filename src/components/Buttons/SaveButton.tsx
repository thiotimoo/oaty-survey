"use client";
import { CaretRight, Download } from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";
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
            var link = document.getElementById("link-download");
            if (!link) return
            link.setAttribute("download", "Hasil-OATY.png");
            link.setAttribute(
                "href",
                result.image_url
                    .replace("image/jpeg", "image/octet-stream")
            );
            link.click();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <a id="link-download"></a>
            <motion.button
                disabled={loading}
                whileHover={{
                    scale: 1.2,
                    transition: { duration: 1 },
                }}
                whileTap={{ scale: 0.9 }}
                className="flex flex-row justify-center items-center text-center text-lg gap-2 bg-black text-white ps-6 pe-6 py-4 rounded-full"
                onClick={handleDownload}
            >
                <Download size={24} weight="fill" />
                Download
            </motion.button>
        </div>
    );
};

export default SaveButton;
