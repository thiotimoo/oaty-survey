import mongoose, { Schema } from "mongoose";

export interface IAnswer {
    scenario: string;
    choice: number;
}
export interface IUser {
    username: String;
    school: String;
    class: String;
    age: Number;
    gender: Number;
}

export interface IQuizReport {
    user: IUser;
    answers: [IAnswer];
    points: number;
    createdAt?: Date;
    updatedAt?: Date;
    _id?: string;
}

const QuizReport = new mongoose.Schema<IQuizReport>(
    {
        user: {
            username: String,
            school: String,
            class: String,
            age: Number,
            gender: Number,
        },
        answers: [
            {
                scenario: String,
                choice: Number,
            },
        ],
        points: Number,
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.QuizReport<IQuizReport> ||
    mongoose.model<IQuizReport>("QuizReport", QuizReport);
