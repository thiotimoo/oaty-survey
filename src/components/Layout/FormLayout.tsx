"use client";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import React, { useEffect, useState } from "react";

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

    const handleGender = (e: any) => {
        setGender(e.target.value);
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

    return (
        <div className="container min-h-svh mx-auto flex flex-col items-center justify-center max-w-screen-lg">
            <FormNavigator
                page={page}
                handlePage={handlePage}
                handleUsername={handleUsername}
                handleGender={handleGender}
                handleUser={handleUser}
                user={user}
            />
        </div>
    );
};

const FormNavigator = ({ page, handlePage, handleUsername, handleGender,handleUser, user }: any) => {
    switch (page) {
        case 1:
            return <FirstPage page={page} handlePage={handlePage} />;
        case 2:
            return (
                <SecondPage
                    page={page}
                    handlePage={handlePage}
                    handleUsername={handleUsername}
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
        />
    );
};

const SecondPage = ({ page, handlePage, handleUsername }: any) => {
    const handleNext = () => {
        handlePage(3);
    };
    return (
        <TemplateDialog
            text="Siapa nama kamu?"
            button="Lanjut"
            callback={handleNext}
        >
            <input onChange={handleUsername} placeholder="Miau" />
        </TemplateDialog>
    );
};

const ThirdPage = ({ page, handlePage, handleGender }: any) => {
    const handleNext = () => {
        handlePage(4);
    };
    return (
        <TemplateDialog
            text="Apa gendermu?"
            button="Lanjut"
            callback={handleNext}
        >
            <select id="gender" onChange={handleGender}>
                <option value={0}>Laki-laki</option>
                <option value={1}>Perempuan</option>
            </select>
        </TemplateDialog>
    );
};

const FinishPage = ({ page, handlePage, user, handleUser }: any) => {
    const handleNext = () => {
        handleUser(user)
        console.log(user)
    };
    return (
        <TemplateDialog
            text="Rileks saja, dan ikuti alurnya dengan jujur ya :D"
            button="Ayo kita mulai"
            callback={handleNext}
        >
        </TemplateDialog>
    );
};

const TemplateDialog = ({ text, button, callback, children }: any) => {
    return (
        <div className="flex flex-col justify-center flex-1 items-center gap-8 max-w-screen-sm">
            <p className="lg:text-3xl text-2xl text-center flex flex-col gap-6">
                {text}
            </p>
            {children}
            <button
                className="flex flex-row justify-center items-center text-center text-xl gap-2 bg-black text-white ps-6 pe-4 py-2 rounded-full"
                onClick={callback}
            >
                {button}
                <CaretRight size={24} weight="fill" />
            </button>
        </div>
    );
};

export default FormLayout;
