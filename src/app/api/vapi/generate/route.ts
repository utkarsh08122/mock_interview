import { generateText } from "ai";
import { GoogleGenAI } from "@google/genai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/helper/responsController";
import { getDataFromToken } from "@/helper/Token";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/lib/model/user.Schema";
import { Interview } from "@/lib/model/interview.Schema";
export async function POST(req: NextRequest) {
  const { type, role, level, techstack, amount, companyName } =
    await req.json();
  const { id }: any = MyCookiesComponent();

  try {
    const genAi = new GoogleGenAI({
      apiKey:"AIzaSyAif7vJNgUz_MTN9a3WQS7MaH4v0dlMd_A",
    });
    const { text: questions }: any = await genAi.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between nontechnical and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: id,
      finalized: true,
      companyName,
    };

    dbConnect();;
    console.log("thi ai tiwe", interview);
    await Interview.create(interview);

    return NextResponse.json(success(200, "successful"));
  } catch (e) {
    return NextResponse.json(error(500, e));
  }
}

export async function GET() {
  return NextResponse.json(success(200, "THANK YOU!"));
}
