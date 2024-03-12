import mongoose from "mongoose";

export interface IQuizSession {
    username: string;
    currentQuestion: string;
    points: number;
    finished: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    _id?: string;
}

const QuizSession = new mongoose.Schema<IQuizSession>(
    {
        username: String,
        points: Number,
        finished: Boolean,
        currentQuestion: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.QuizSession<IQuizSession> ||
    mongoose.model<IQuizSession>("QuizSession", QuizSession);
