"use client";
import React from "react";
import Image from "next/image";
import avgAcc from "@/app/assets/images/avgAcc.svg";
import avrSpeed from "@/app/assets/images/avrSpeed.svg";
import typingTime from "@/app/assets/images/typingTime.svg";
import Pfp from "@/app/assets/images/Pfp.svg";

export default function ProgressBar() {
  // 🧠 Simplified weekly progress data (true = practiced that day)
  const weeklyProgress = {
    Mon: true,
    Tue: false,
    Wed: true,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  };

  const totalDays = 7;
  const completedDays = Object.values(weeklyProgress).filter(Boolean).length;
  const progressPercent = (completedDays / totalDays) * 100;

  return (
    <div className="flex justify-around items-center gap-6">
      <div className="">
        <Image src={Pfp} alt="img" />
      </div>
      <div className="w-[400px] h-[40px] bg-[#001F3F] border border-gray-500 rounded-md flex items-center px-4 relative  mr-42">
        <div
          className="absolute top-0 left-0 h-full bg-[#C7FF00] rounded-md transition-all duration-300 ease-in-out "
          style={{ width: `${progressPercent}%`, zIndex: 0 }}
        ></div>

        <div className="flex justify-between w-full z-10">
          <span className="text-white">
            <span className="bg-[#C7FF00] px-1 ">Typing</span> Progress (
            {completedDays}/{totalDays})
          </span>
          <span className="text-white text-sm">6,678xp to go</span>
        </div>
      </div>
      <div className="flex gap-6 ">
        <Image src={avrSpeed} alt="img" />
        <Image src={typingTime} alt="img" />
        <Image src={avgAcc} alt="img" />
      </div>
    </div>
  );
}
