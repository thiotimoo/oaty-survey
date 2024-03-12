import mongoose from "mongoose";

export interface IQuizQuestion {
    question: string;
    answer: {
        A: {
            body: string,
            points: number,
            nextQuestion: string,
        },
        B: {
            body: string,
            points: number,
            nextQuestion: string,
        },
    }
    createdAt?: Date;
    updatedAt?: Date;
    _id: string;
}

const QuizQuestion = new mongoose.Schema<IQuizQuestion>(
    {
        question: String,
        answer: {
            A: {
                body: String,
                points: Number,
                nextQuestion: String,
            },
            B: {
                body: String,
                points: Number,
                nextQuestion: String,
            },
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.QuizQuestion<IQuizQuestion> ||
    mongoose.model<IQuizQuestion>("QuizQuestion", QuizQuestion);
