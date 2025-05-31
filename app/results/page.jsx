"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import typingBG from "@/app/assets/images/typingBG.jpg";
import TestsBox from "../components/TestsBox";
import Circular from "../components/Circular";
import Progress from "../components/Progress";
import WeekChart from "@/app/assets/images/WeekChart.svg";

export default function Results() {
  const [wpm, setWPM] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [bestWPM, setBestWPM] = useState(0);
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    const wpmStored = parseInt(localStorage.getItem("wpm") || "0");
    const accuracyStored = parseInt(localStorage.getItem("accuracy") || "0");
    const bestWPMStored = parseInt(localStorage.getItem("bestWPM") || "0");
    const durationStored = parseInt(localStorage.getItem("duration") || "60");

    setWPM(wpmStored);
    setAccuracy(accuracyStored);
    setBestWPM(bestWPMStored);
    setDuration(durationStored);
  }, []);

  const recordPercent = bestWPM > 0 ? Math.min((wpm / bestWPM) * 100, 100) : 0;
  const isNewRecord = wpm >= bestWPM && wpm !== 0;

  return (
    <div className="container mx-auto">
      <Image src={typingBG} alt="img" className="w-screen relative" />

      <div className="absolute top-36 left-1/7">
        <Progress />
      </div>
      <div className="absolute top-80 left-32">
        <TestsBox
          boxClass="w-80 h-12 flex items-center justify-center gap-20"
          wrapperClass="flex flex-col gap-1"
          paraClass="text-2xl"
        />
      </div>

      <div className="absolute top-96 left-1/3  mt-5 ml-20">
        <div className=" bg-[#1e3a8a] p-6 rounded-lg shadow-md shadow-blue-300 flex gap-24">
          <div className="grid grid-cols-2 gap-4">
            <Circular label="ACC" value={`${accuracy}%`} percent={accuracy} />
            <Circular label="WPM" value={wpm} percent={Math.min(wpm, 100)} />
            <Circular
              label="Time"
              value={`${Math.floor(duration / 60)}:${String(
                duration % 60
              ).padStart(2, "0")}`}
              percent={100}
            />
            <Circular
              label="Record"
              value={`${bestWPM} WPM${isNewRecord ? " 🎉" : ""}`}
              percent={recordPercent}
            />
          </div>
          <div className="p-4">
            <Image src={WeekChart} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
}
