"use client";

import Image from "next/image";
import React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PenTool, Brain, Share2, Zap } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";

const IntroPage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-between items-center justify-center h-full md:h-[calc(100vh-50px)] bg-gradient-to-t from-blue-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-[99%]md:w-2/3 flex flex-col items-center justify-center md:ml-6 p-4">
        <main className="mx-auto text-center">
          <h1
            className={`text-2xl md:text-4xl font-bold mb-3 transition-all duration-1000 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Welcome to{" "}
            <span className="text-blue-600 dark:text-blue-400">
              The Write Way
            </span>
          </h1>
          <p
            className={`text-lg md:text-xl mb-4 md:mb-6 transition-all duration-1000 delay-300 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Elevate your writing with AI-powered collaboration
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 md:mb-6">
            {[
              {
                icon: PenTool,
                title: "Intuitive Editing",
                description:
                  "Seamless writing experience with real-time collaboration",
              },
              {
                icon: Brain,
                title: "AI Assistance",
                description:
                  "Powered by OpenAI for smart suggestions and content generation",
              },
              // {
              //   icon: Share2,
              //   title: "Easy Sharing",
              //   description:
              //     "Share and collaborate with anyone, anywhere, anytime",
              // },
              // {
              //   icon: Zap,
              //   title: "Instant Sync",
              //   description:
              //     "Your documents are always up-to-date across all devices",
              // },
            ].map((feature, index) => (
              <Card
                key={index}
                className={`transition-all duration-1000 ease-out ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200 + 600}ms` }}
              >
                <CardContent className="flex flex-col items-center p-4">
                  <div className="flex gap-2 items-center">
                    <feature.icon className="size-8 mb-4 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-sm md:text-lg font-semibold mb-2">
                      {feature.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <SignInButton>
            <Button
              className={`transition-all duration-1000 delay-1400 ease-out ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Get Started for Free
            </Button>
          </SignInButton>
        </main>
      </div>
      <div className="w-10/12 md:w-[45%]  md:ml-4">
        <Image
          src="/hero.gif"
          alt="hero"
          className="md:w-10/12 w-full"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default IntroPage;
