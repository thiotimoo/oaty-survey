import { promises as fs } from "fs";
let file: any;
let data: any;

export async function getAllQuestions() {
    if (!file)
        file = await fs.readFile(
            process.cwd() + "/data/questions.json",
            "utf8"
        );
    if (!data && file) data = JSON.parse(file);
    return data;
}

export async function getQuestion(id: string) {
    return (await getAllQuestions())[id];
}

export async function getQuestionChoice(id: string, choice: number) {
    const question = await getQuestion(id)
    return (await question.choices[choice]);
}
