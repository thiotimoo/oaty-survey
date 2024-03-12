import mongoose from "mongoose";

export interface IQuizResult {
    username: string;
    points: number;
    createdAt?: Date;
    updatedAt?: Date;
    _id: string;
}

const QuizResult = new mongoose.Schema<IQuizResult>(
    {
        username: String,
        points: Number,
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.QuizResult<IQuizResult> ||
    mongoose.model<IQuizResult>("QuizResult", QuizResult);
