import { createCanvas, loadImage, registerFont } from "canvas";
import path from "path";
import { getAllQuestions } from "./questions";

registerFont(path.join(process.cwd(), "/data/assets/fonts/Jua-Regular.ttf"), {
    family: "Jua",
});
export function quizGenerateCharacter(points: number) {
// 1. Bodoamatan (Tika): -22 hingga -11
// 2. Waras (Wila) : -10 hingga 2
// 3. Mikir (Pito) : 3 hingga 12
// 4. Ovt (Rira): 13 hingga 22
// 5. Sering ovt (Vina): 23 hingga 28
    let character;
    if (points <= 28 && points >= 23) {
        character = "vina"
    }else if(points <= 22 && points >= 13) {
        character="rira"
    }else if(points <= 12 && points >= 3) {
        character="pito"
    }else if(points <= 2 && points >= -10) {
        character="wila"
    }else{
        character="tika"
    }
    return `result_${character}.jpg`
}
export async function quizGenerateImage(result: any) {
    const canvas = createCanvas(1080, 1920);
    const ctx = canvas.getContext("2d");

    const image = await loadImage(
        path.join(process.cwd(), 'public', 'results', quizGenerateCharacter(result.points).toString())
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
