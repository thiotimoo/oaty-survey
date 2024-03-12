export async function answerQuestion(session_id: string, choice: number) {
    const data = {
        type: "ANSWER",
        session_id: session_id,
        choice: choice,
    };

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/survey/quiz`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    return await res.json();
}

export async function createSession() {
    let session_id = -1;

    const data = {
        username: "Udin",
    };
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/survey/new-session`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        const resJson = await res.json();

        if (resJson) {
            session_id = resJson.data._id;
        }
    } catch (error) {
        console.error(error);
    }
    return session_id;
}
