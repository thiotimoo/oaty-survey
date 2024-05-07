import { createCanvas, loadImage, registerFont } from "canvas";
import path from "path";
import { getAllQuestions } from "./questions";

registerFont(path.join(process.cwd(), "/public/assets/fonts/Jua-Regular.ttf"), {
    family: "Jua",
});
export function quizGenerateCharacter(points: number) {
    // 1. Bodoamatan (Tika): -22 hingga -11
    // 2. Waras (Wila) : -10 hingga 2
    // 3. Mikir (Pito) : 3 hingga 12
    // 4. Ovt (Rira): 13 hingga 22
    // 5. Sering ovt (Vina): 23 hingga 28
    let character;
    if (points >= 26) {
        character = "vina";
    } else if (points <= 25 && points >= 11) {
        character = "rira";
    } else if (points <= 10 && points >= 1) {
        character = "pito";
    } else if (points <= 0 && points >= -16) {
        character = "wila";
    } else {
        character = "tika";
    }
    return `result-${character}.jpg`;
}
export async function quizGenerateImage(result: any) {
    const canvas = createCanvas(1080, 1920);
    const ctx = canvas.getContext("2d");

    const image = await loadImage(
        path.join(
            process.cwd(),
            "public",
            "results",
            quizGenerateCharacter(result.points).toString()
        )
    );
    ctx.drawImage(image, 0, 0, 1080/2, 1920/2);

    ctx.font = "20px Jua";
    ctx.textAlign = "left";
    ctx.fillText(result.user.username, 100/2, 125/2);

    ctx.font = "10px Jua";
    ctx.textAlign = "left";
    ctx.fillText(result.id, 100/2, 165/2);
    var quality = 0.7;
    var dataUri = canvas.toDataURL("image/jpeg", quality);
    return dataUri;
}

export async function quizCalculatePoints(answers: any) {
    const allQuestion = await getAllQuestions();

    let points = 0;
    for (let i = 0; i < answers.length; i++) {
        const answer = answers[i];
        const choice = allQuestion[answer.scenario].choices[answer.choice];
        points += choice.points;
    }

    return points;
}
