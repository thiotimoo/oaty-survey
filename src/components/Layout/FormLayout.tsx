"use client";
import { AnimatePresence, motion } from "framer-motion";
import { CaretRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import React, { Children, useEffect, useState } from "react";
import TypewriterComponent from "typewriter-effect";
import Image from "next/image";

const FormLayout = ({ handleUser }: any) => {
    const [user, setUser]: any = useState();
    const [username, setUsername] = useState("");
    const [gender, setGender] = useState(0);
    const [page, setPage] = useState(1);
    const handlePage = (page: number) => {
        setPage(page);
    };

    const handleUsername = (e: any) => {
        setUsername(e.target.value);
    };

    const handleGender = (value: any) => {
        setGender(value);
    };

    useEffect(() => {
        setUser({
            username: username,
            gender: gender,
            age: 0,
            school: "",
            class: "",
        });
    }, [username, gender]);
    const variants = {
        hidden: { opacity: 0, x: -200 },
        enter: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 0 },
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={page}
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ type: "spring", stiffness: 100 }}
                className="container min-h-svh mx-auto flex flex-col items-center justify-center max-w-screen-lg overflow-x-hidden"
            >
                <FormNavigator
                    page={page}
                    handlePage={handlePage}
                    handleUsername={handleUsername}
                    handleGender={handleGender}
                    handleUser={handleUser}
                    user={user}
                    username={username}
                />
            </motion.div>
        </AnimatePresence>
    );
};

const FormNavigator = ({
    page,
    handlePage,
    handleUsername,
    handleGender,
    handleUser,
    user,
    username,
}: any) => {
    switch (page) {
        case 1:
            return <FirstPage page={page} handlePage={handlePage} />;
        case 2:
            return (
                <SecondPage
                    page={page}
                    handlePage={handlePage}
                    handleUsername={handleUsername}
                    username={username}
                />
            );
        case 3:
            return (
                <ThirdPage
                    page={page}
                    handlePage={handlePage}
                    handleGender={handleGender}
                />
            );
        case 4:
            return (
                <FinishPage
                    page={page}
                    handlePage={handlePage}
                    user={user}
                    handleUser={handleUser}
                />
            );
    }
};

const FirstPage = ({ page, handlePage, user }: any) => {
    const handleNext = () => {
        handlePage(2);
    };
    return (
        <TemplateDialog
            text="Selamat datang di Oaty! Di sini, kamu akan menjawab beberapa
        pertanyaan yang akan mengukur tingkat overthinking kamu."
            button="Lanjut"
            callback={handleNext}
            top={
                <Image
                    className="rounded-xl md:w-64 md:h-64 w-32 h-32 aspect-square object-cover"
                    src={"/assets/cat_greetings.gif"}
                    alt="Hello!"
                    width={200}
                    height={200}
                />
            }
        ></TemplateDialog>
    );
};

const SecondPage = ({ page, handlePage, handleUsername, username }: any) => {
    const [error, setError] = useState("");
    const handleNext = () => {
        if (username.trim() == "") {
            setError("Nama tidak boleh kosong!");
        } else {
            setError("");
            handlePage(3);
        }
    };
    return (
        <TemplateDialog
            bold
            error={error}
            text="Siapa nama kamu?"
            button="Lanjut"
            top={
                <Image
                    className="rounded-xl md:w-64 md:h-64 w-32 h-32 aspect-square object-contain "
                    src={"/assets/cat_boing.gif"}
                    alt="Cat Calm"
                    width={200}
                    height={200}
                />
            }
            callback={handleNext}
        >
            <motion.input
                whileTap={{ scale: 0.9 }}
                className="bg-white px-4 py-2 rounded-lg text-lg w-full shadow-lg"
                onKeyDown={(event)=> {
                    if(event.key === 'Enter') {
                        handleNext()      
                    }
                }}
                onChange={handleUsername}
                placeholder="Ketik disini..."
            />
            <p>
                <b>Note:</b> Boleh Inisial Kok :D
            </p>
        </TemplateDialog>
    );
};

const SelectionItem = ({
    selectedValue,
    value,
    handleChange,
    children,
}: any) => {
    const isSelected = selectedValue == value;
    let selectedStyle = "text-black";
    if (isSelected) {
        selectedStyle = "bg-white text-black shadow-lg";
    }
    return (
        <motion.button
            onClick={() => {
                handleChange(value);
            }}
            whileTap={{ scale: 0.9 }}
            className={`flex flex-col justify-center items-center text-center text-xl gap-2 text-black rounded-lg  ${selectedStyle} relative`}
        >
            {isSelected && <CheckCircle className="absolute top-0 right-0 m-2 text-green-600" size="24" weight="fill"/>}
            {children}
        </motion.button>
    );
};

const ThirdPage = ({ page, handlePage, handleGender }: any) => {
    const [gender, setGender] = useState(0);
    const handleChangeGender = (value: any) => {
        setGender(value);
    };
    const handleNext = () => {
        handleGender(gender)
        handlePage(4);
    };
    return (
        <TemplateDialog
            bold
            text="Pilih gendermu."
            button="Lanjut"
            callback={handleNext}
        >
            <div className="w-full h-64 flex flex-row justify-center items-center p-2 gap-2">
                <SelectionItem
                    value={0}
                    selectedValue={gender}
                    handleChange={handleChangeGender}
                >
                    <Image
                        className="aspect-square object-contain"
                        src={"/assets/omori-transparent.gif"}
                        alt="Laki-laki"
                        width={200}
                        height={200}
                    />
                    <span className="font-bold p-2">Laki-laki</span>
                </SelectionItem>
                <SelectionItem
                    value={1}
                    selectedValue={gender}
                    handleChange={handleChangeGender}
                >
                    <Image
                        className="aspect-square object-contain"
                        src={"/assets/female-transparent.webp"}
                        alt="Perempuan"
                        width={200}
                        height={200}
                    />
                    <span className="font-bold p-2">Perempuan</span>
                </SelectionItem>
            </div>
        </TemplateDialog>
    );
};

const FinishPage = ({ page, handlePage, user, handleUser }: any) => {
    const handleNext = () => {
        handleUser(user);
        console.log(user);
    };
    return (
        <TemplateDialog
            text="Rileks saja, dan ikuti alurnya dengan jujur ya :D"
            button="Ayo kita mulai"
            top={
                <Image
                    className="rounded-xl md:w-64 md:h-64 w-32 h-32 aspect-square object-contain"
                    src={"/assets/cat_calm.gif"}
                    alt="Cat Calm"
                    width={200}
                    height={200}
                />
            }
            callback={handleNext}
        />
    );
};

const TemplateDialog = ({
    text,
    button,
    callback,
    children,
    top,
    bold,
    error,
}: any) => {
    const [finish, setFinish] = useState(false);
    const handleFinished = () => {
        setFinish(true);
    };
    let style_bold = "";
    if (bold) {
        style_bold = "font-bold";
    }
    return (
        <AnimatePresence>
            <div
                className={`flex flex-col justify-center flex-1 items-center gap-4 max-w-screen-sm`}
            >
                {top}
                <div
                    className={`${style_bold} lg:text-3xl text-2xl text-center px-8`}
                >
                    <TypewriterComponent
                        options={{
                            delay: 20,
                            cursor: "",
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString(text)
                                .callFunction(handleFinished)
                                .start();
                        }}
                    />
                </div>
                {finish && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full flex flex-col justify-center items-center gap-4"
                    >
                        {children}
                        <motion.button
                            whileHover={{
                                scale: 1.2,
                                transition: { duration: 1 },
                            }}
                            whileTap={{ scale: 0.9 }}
                            className="flex flex-row justify-center items-center text-center text-xl gap-2 bg-black text-white ps-8 pe-6 py-4 rounded-full"
                            onClick={callback}
                        >
                            {button}
                            <CaretRight size={24} weight="fill" />
                        </motion.button>
                        {error != "" && (
                            <motion.p
                                key={error}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-red-700 font-bold w-full flex flex-col justify-center items-center gap-4"
                            >
                                {error}
                            </motion.p>
                        )}
                    </motion.div>
                )}
            </div>
        </AnimatePresence>
    );
};

export default FormLayout;
