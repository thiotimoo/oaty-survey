import connectDatabase from "@/lib/connect-db";
import { getQuestion } from "@/lib/questions";
import { createCanvas, loadImage, registerFont } from "canvas";
import QuizResult from "@/model/QuizReport";
import QuizSession from "@/model/QuizSession";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

