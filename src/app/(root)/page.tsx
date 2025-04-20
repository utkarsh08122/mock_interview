"use client";
import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interveiw-Ready with AI-Powered Practice & Feedback </h2>
          <p className="text-lg">
            Preactice on real interveiw questions & get instanst feedback
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interveiw</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interveiw</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interveiw) => (
            <InterviewCard
              key={interveiw.id}
              role={interveiw.role}
              interviewId={interveiw.id}
              userId={interveiw.userId}
              techstack={interveiw.techstack}
              type={interveiw.type}
            />
          ))}

          {/* <p>You haven&apos;t take any interveiw</p> */}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interveiw</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interveiw) => (
            <InterviewCard
              key={interveiw.id}
              role={interveiw.role}
              interviewId={interveiw.id}
              userId={interveiw.userId}
              techstack={interveiw.techstack}
              type={interveiw.type}
            />
          ))}
          {/* <p>There are no interveiw available</p> */}
        </div>
      </section>
    </>
  );
};

export default page;
