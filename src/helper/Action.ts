import { dbConnect } from "@/lib/dbConnect";
import { Interview } from "@/lib/model/interview.Schema";
import { MyCookiesComponent } from "./Token";
import { User } from "@/lib/model/user.Schema";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { feedbackSchema } from "@/constants";
import { Feedbacks } from "@/lib/model/feedback.Schema";
import { success } from "./responsController";

export const getInterviewData = async (id: any) => {
  dbConnect();
  const interview = await Interview.find({ userId: id }).sort({
    timestamp: -1,
  });
  return interview;
};

export const getLetestInterviewData = async (id: any) => {
  dbConnect();
  const interview = await Interview.find({ userId: { $ne: id } })
    .sort({
      timestamp: -1,
    })
    .limit(20);
  return interview;
};

export const getIntervewById = async (id: any) => {
  dbConnect();

  const interview = await Interview.findById({ _id: id });
  return interview;
};

export const getUserData = async () => {
  const { id }: any = await MyCookiesComponent();
  const user = await User.findById({ _id: id });
  return user;
};


