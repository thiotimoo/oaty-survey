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
    const [classroom, setClassroom] = useState("");
    const [page, setPage] = useState(1);
    const [school, setSchool] = useState("YOS SUDARSO KARAWANG");
    const handlePage = (page: number) => {
        setPage(page);
    };

    const handleUsername = (e: any) => {
        setUsername(e.target.value);
    };

    const handleGender = (value: any) => {
        setGender(value);
    };

    const handleClassroom = (value: any) => {
        setClassroom(value);
    };

    const handleSchool = (value: any) => {
        setSchool(value);
    };

    useEffect(() => {
        setUser({
            username: username,
            gender: gender,
            age: 0,
            school: school,
            class: classroom,
        });
    }, [username, gender, school, classroom]);
    const variants = {
        hidden: { opacity: 0, x: 0 },
        enter: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -200 },
    };

    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                key={page}
                initial="hidden"
                animate="enter"
                exit="exit"
                variants={variants}
                transition={{ type: "spring", stiffness: 100 }}
                className="container min-h-svh mx-auto flex flex-col items-center justify-center max-w-screen-sm overflow-x-hidden"
            >
                <FormNavigator
                    page={page}
                    handlePage={handlePage}
                    handleUsername={handleUsername}
                    handleGender={handleGender}
                    handleSchool={handleSchool}
                    handleClassroom={handleClassroom}
                    handleUser={handleUser}
                    school={school}
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
    handleSchool,
    handleClassroom,
    school,
    user,
    username,
}: any) => {
    switch (page) {
        case 1:
            return (
                <NamePage
                    page={page}
                    handlePage={handlePage}
                    handleUsername={handleUsername}
                    username={username}
                />
            );
        case 2:
            return (
                <GenderPage
                    page={page}
                    handlePage={handlePage}
                    handleGender={handleGender}
                />
            );
        case 3:
            return (
                <SchoolPage
                    page={page}
                    handlePage={handlePage}
                    handleSchool={handleSchool}
                />
            );
        default:
            return (
                <ClassPage
                    page={page}
                    school={school}
                    handlePage={handlePage}
                    handleClassroom={handleClassroom}
                    user={user}
                    handleUser={handleUser}
                />
            );
    }
};

const NamePage = ({ page, handlePage, handleUsername, username }: any) => {
    const [error, setError] = useState("");
    const handleNext = () => {
        if (username.trim() == "") {
            setError("Nama tidak boleh kosong!");
        } else {
            const inputName = document.getElementById("input-name");
            setError("");
            handlePage(2);
            try {
                if (inputName) return inputName.blur();
            } catch (e) {}
        }
    };
    return (
        <TemplateDialog
            bold
            error={error}
            text="Siapa nama kamu?"
            button="Lanjut"
            callback={handleNext}
        >
            <motion.input
                id="input-name"
                whileTap={{ scale: 0.9 }}
                className="bg-white px-4 py-2 rounded-lg text-lg w-full shadow-lg"
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleNext();
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
            className={`flex flex-col justify-center items-center text-center text-xl gap-2 text-black rounded-lg  ${selectedStyle} relative w-full`}
        >
            {isSelected && (
                <CheckCircle
                    className="absolute top-0 right-0 m-2 text-green-600"
                    size="24"
                    weight="fill"
                />
            )}
            {children}
        </motion.button>
    );
};

const SelectionSchool = ({
    selectedValue,
    value,
    handleChange,
    children,
}: any) => {
    const isSelected = selectedValue == value;
    let selectedStyle = "text-black";
    let selectedVisibility = "opacity-0";
    if (isSelected) {
        selectedStyle = "bg-white text-black shadow-lg";
        selectedVisibility = "opacity-100";
    }
    return (
        <motion.button
            onClick={() => {
                handleChange(value);
            }}
            whileTap={{ scale: 0.9 }}
            className={`flex flex-row justify-between items-center text-left text-xl text-black rounded-lg  ${selectedStyle} relative w-full flex-1`}
        >
            {children}
            <CheckCircle
                className={"m-4 text-green-600 " + selectedVisibility}
                size="24"
                weight="fill"
            />
        </motion.button>
    );
};

const SelectionClass = ({ selectedValue, value, handleChange }: any) => {
    const isSelected = selectedValue == value;
    let selectedStyle = "text-black";
    let selectedVisibility = "opacity-0 border-black  bg-opacity-10";
    if (isSelected) {
        selectedStyle =
            "bg-white text-black shadow-lg border-transparent bg-opacity-100";
        selectedVisibility = "opacity-100";
    }
    return (
        <motion.button
            onClick={() => {
                handleChange(value);
            }}
            whileTap={{ scale: 0.9 }}
            className={`flex flex-row justify-between items-center text-xl text-black rounded-lg border-2 border-dashed ${selectedStyle} relative w-full flex-1`}
        >
            <span className="ps-4 text-center font-bold">{value}</span>
            <CheckCircle
                className={"m-4 text-green-600 " + selectedVisibility}
                size="24"
                weight="fill"
            />
        </motion.button>
    );
};

const GenderPage = ({ page, handlePage, handleGender }: any) => {
    const [gender, setGender] = useState(0);
    const handleChangeGender = (value: any) => {
        setGender(value);
    };
    const handleNext = () => {
        handleGender(gender);
        handlePage(3);
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
                        src={"/assets/omori-transparent.webp"}
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

const SchoolPage = ({ page, handlePage, handleSchool }: any) => {
    const [school, setSchool] = useState("YOS SUDARSO KARAWANG");
    const [error, setError] = useState("");
    const [customSchool, setCustomSchool] = useState("");
    const handleChangeSchool = (value: any) => {
        setSchool(value);
    };
    const handleCustomSchool = (e: any) => {
        const value = e.target.value;
        if (
            value.toUpperCase() == "YOS SUDARSO KARAWANG" ||
            value.toUpperCase() == "TUNAS DHARMA KARAWANG"
        ) {
            handleChangeSchool(value.toUpperCase());
            setCustomSchool("");
        } else {
            handleChangeSchool(value.toUpperCase());
            setCustomSchool(value.toUpperCase());
        }
    };
    const handleNext = () => {
        if (school.trim() == "") {
            setError("Nama sekolah boleh kosong!");
        } else {
            setError("");
            handleSchool(school);
            handlePage(4);
        }
    };
    return (
        <TemplateDialog
            bold
            text="Dimana kamu bersekolah?"
            button="Lanjut"
            callback={handleNext}
            error={error}
        >
            <div className="w-full flex flex-col justify-center items-center p-2 gap-2">
                <SelectionSchool
                    value="YOS SUDARSO KARAWANG"
                    selectedValue={school}
                    handleChange={handleChangeSchool}
                >
                    <Image
                        alt="Yos Sudarso Karawang"
                        className="w-16 h-16 p-2"
                        src="/assets/school-yos.webp"
                        width={200}
                        height={200}
                    />
                    <span className="font-bold p-2">YOS SUDARSO KARAWANG</span>
                </SelectionSchool>
                {/* <SelectionSchool
                    value="TUNAS DHARMA KARAWANG"
                    selectedValue={school}
                    handleChange={handleChangeSchool}
                >
                    <Image
                        alt="Tunas Dharma Karawang"
                        className="w-16 h-16 p-2"
                        src="/assets/school-td.webp"
                        width={200}
                        height={200}
                    />
                    <span className="font-bold p-2">TUNAS DHARMA KARAWANG</span>
                </SelectionSchool> */}
                <SelectionSchool
                    value={customSchool}
                    selectedValue={school}
                    handleChange={handleChangeSchool}
                >
                    <div className="flex flex-col">
                        <input
                            className=" bg-transparent w-full h-full placeholder-zinc-800 font-bold p-6"
                            placeholder="Sekolah lain..."
                            value={customSchool}
                            onChange={handleCustomSchool}
                        />
                    </div>
                </SelectionSchool>
            </div>
        </TemplateDialog>
    );
};

const ClassPage = ({
    page,
    handlePage,
    handleClassroom,
    school,
    handleUser,
    user,
}: any) => {
    const [classroom, setClassroom] = useState("");
    const [error, setError] = useState("");
    const handleChangeClassroom = (value: any) => {
        setClassroom(value);
    };
    const handleNext = () => {
        if (classroom.trim() == "") {
            setError("Kelas tidak boleh kosong!");
        } else {
            setError("");
            handleClassroom(classroom);
            handleUser(user);
        }
    };
    const handleYosClass = () => {
        return (
            <div className="w-full flex flex-col justify-center items-center p-2 gap-2">
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-base font-bold text-start w-full">
                        SMA
                    </span>
                    <div className="grid-cols-2 grid w-full bg-red-300 gap-2 p-2 rounded-xl">
                        <SelectionClass
                            value="10.1"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                        <SelectionClass
                            value="10.2"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                        <SelectionClass
                            value="10.3"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                        <SelectionClass
                            value="10.4"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                    </div>
                    <div className="grid grid-cols-2 w-full bg-blue-300 gap-2 p-2 rounded-xl">
                        <SelectionClass
                            value="11.1"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                        <SelectionClass
                            value="11.2"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                        <SelectionClass
                            value="11.3"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                        <SelectionClass
                            value="11.4"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                    </div>
                    {/* <div className="grid grid-cols-2 w-full bg-green-300 gap-2 p-2 rounded-xl">
                        <SelectionClass
                            value="12.A1"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                        <SelectionClass
                            value="12.A2"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                        <SelectionClass
                            value="12.S1"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                        <SelectionClass
                            value="12.S2"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                    </div> */}
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-base font-bold text-start w-full">
                        SMP
                    </span>
                    <div className="w-full bg-purple-300 gap-2 p-2 rounded-xl">
                        <SelectionClass
                            value="7"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                    </div>
                    <div className="w-full bg-orange-300 gap-2 p-2 rounded-xl">
                        <SelectionClass
                            value="8"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                    </div>
                    <div className="w-full bg-indigo-300 gap-2 p-2 rounded-xl">
                        <SelectionClass
                            value="9"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                    </div>
                </div>
            </div>
        );
    };
    const handleAllClass = () => {
        return (
            <div className="w-full flex flex-col justify-center items-center p-2 gap-2">
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-base font-bold text-start w-full">
                        SMP
                    </span>
                    <div className="w-full bg-purple-300 gap-2 p-2 rounded-xl">
                        <SelectionClass
                            value="7"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                    </div>
                    <div className="w-full bg-orange-300 gap-2 p-2 rounded-xl">
                        <SelectionClass
                            value="8"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                    </div>
                    <div className="w-full bg-indigo-300 gap-2 p-2 rounded-xl">
                        <SelectionClass
                            value="9"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-base font-bold text-start w-full">
                        SMA
                    </span>
                    <div className="w-full bg-red-300 gap-2 p-2 rounded-xl">
                        <SelectionClass
                            value="10"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                    </div>
                    <div className="w-full bg-blue-300 gap-2 p-2 rounded-xl">
                        <SelectionClass
                            value="11"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                    </div>
                    <div className="w-full bg-green-300 gap-2 p-2 rounded-xl">
                        <SelectionClass
                            value="12"
                            selectedValue={classroom}
                            handleChange={handleChangeClassroom}
                        />
                    </div>
                </div>
            </div>
        );
    };
    return (
        <TemplateDialog
            bold
            text="Pilih kelasmu."
            button="Lanjut"
            error={error}
            callback={handleNext}
        >
            {school === "YOS SUDARSO KARAWANG"
                ? handleYosClass()
                : handleAllClass()}
        </TemplateDialog>
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
                className={`flex flex-col justify-center flex-1 items-center gap-4 max-w-screen-sm py-6`}
            >
                {top}
                <div className={`${style_bold} text-xl text-center px-8`}>
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

                <div className="w-full flex flex-col justify-center items-center gap-4">
                    {children}
                    <motion.button
                        whileHover={{
                            scale: 1.2,
                            transition: { duration: 1 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="flex flex-row justify-center items-center text-center text-lg gap-2 bg-primary  text-black font-bold ps-8 pe-6 py-4 rounded-full"
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
                </div>
            </div>
        </AnimatePresence>
    );
};

export default FormLayout;
