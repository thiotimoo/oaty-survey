export function quizFormatQuestion(question:string, gender: number) {
    const myGender = gender == 0 ? "laki-laki":"perempuan"
    const invertGender = gender == 0 ? "perempuan":"laki-laki"
    question = question.replaceAll('${invertGender}', invertGender)
    question = question.replaceAll('${myGender}', myGender)
    return question
}

export async function quizClientSubmit(user: any, answers: any) {
    const data = {
        type: "SUBMIT",
        user: user,
        answers: answers,
    }
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/survey/quiz`,
            {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        const resJson = await res.json();

        return resJson;
    } catch (error) {
        console.error(error);
        return { statusCode: 400, error: error };
    }
    
}

export async function quizFetchQuestions() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/survey/get-questions`,
        {
            cache: "no-store",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return (await res.json()).data;
}