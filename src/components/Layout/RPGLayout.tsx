import Image from "next/image";
import React from "react";

const RPGLayout = ({ data, user }: any) => {
    return (
        <div className="w-full flex-1 max-w-screen-sm flex flex-col items-center justify-end flex-shrink px-4 py-2">
            <Image
                priority={true}
                src={
                    user?.gender == 0
                        ? "/assets/omori-transparent.webp"
                        : "/assets/female-transparent.webp"
                }
                alt="Portrait"
                className="aspect-square lg:h-64 md:h-52 h-48 w-auto object-contain"
                width={400}
                height={400}
            />
        </div>
    );
};

export default RPGLayout;
