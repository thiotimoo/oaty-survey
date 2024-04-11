import { createCanvas, loadImage, registerFont } from "canvas";
import path from "path";
import { getAllQuestions } from "./questions";

registerFont(path.join(process.cwd(), "/data/assets/fonts/Jua-Regular.ttf"), {
    family: "Jua",
});

export async function quizGenerateImage(result: any) {
    const canvas = createCanvas(1080, 1920);
    const ctx = canvas.getContext("2d");

    const image = await loadImage(
        path.join(process.cwd(), "/data/assets/result-ovito.jpg")
    );
    ctx.drawImage(image, 0, 0, 1080, 1920);

    ctx.font = "40px Jua";
    ctx.textAlign = "left";
    ctx.fillText(result.user.username, 100, 125);

    ctx.font = "30px Jua";
    ctx.textAlign = "left";
    ctx.fillText(result.id, 100, 165);
    return canvas.toDataURL();
}

export async function quizCalculatePoints(answers: any){
    const allQuestion = await getAllQuestions();

    let points = 0;
    for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        const choice = allQuestion[answer.scenario].choices[answer.choice];
        points += choice.points;
    }

    return points;
}
