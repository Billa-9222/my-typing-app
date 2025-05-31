"use client"
import Image from "next/image";
import typingBG from "@/app/assets/images/typingBG.jpg";
import Testsbox from "../components/TestsBox";
import Progress from "../components/Progress";

export default function HomePage() {
  return (
    <div className="container mx-auto ">
      <div>
        <Image src={typingBG} alt="bg image" className=" relative w-screen  " />
      </div>

      <div className="absolute top-50 left-1/7">
        <Progress />
      </div>
      <div className="absolute top-96 left-64">
        <Testsbox
          boxClass="w-80 h-40  pt-8 rounded-lg shadow-md shadow-blue-300 "
          paraClass="text-3xl"
          wrapperClass="grid grid-cols-3 gap-8 "
          buttonClass="ml-24 mt-6"
        />
      </div>
    </div>
  );
}
