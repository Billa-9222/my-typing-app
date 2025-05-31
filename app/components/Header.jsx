"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TypingTestTXT from "@/app/assets/images/TypingTestTXT.svg";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const pathname = usePathname();
  const { user } = useContext(UserContext);

  const links = [
    { id: "home", text: "Home", link: "/HomePage" },
    { id: "lessons", text: "Lessons", link: "/Lessons" },
    { id: "test", text: "Tests", link: "/test" },
    { id: "Games", text: "Games", link: "/Games" },
    { id: "results", text: "Results", link: "/results" },
  ];

  return (
    <div className="flex items-center mt-6">
      <div className="m-6 mr-60 ">
        <Image src={TypingTestTXT} alt="Typing Test" />
      </div>
      <div className="bg-[#0B0A2A] w-2xl h-14 flex items-center justify-center m-6 mr-32 rounded-lg shadow-md shadow-blue-300">
        <ul className="flex gap-8 mr-26 text-white">
          {links.map((link) => {
            const isActive = pathname === link.link;
            return (
              <li key={link.id}>
                <Link
                  href={link.link}
                  className={`pb-2 border-b-2 transition-all duration-300 ${
                    isActive
                      ? "border-[#C7FF00] text-white"
                      : "border-transparent hover:border-[#C7FF00] text-gray-300"
                  }`}
                >
                  {link.text}
                </Link>
              </li>
            );
          })}
        </ul>

        <div>
          {user ? (
            <span className="text-blue-300 font-bold">👤 {user.username}</span>
          ) : (
            <Link href="/Login">
              <button className="bg-blue-400 px-4 py-2 rounded-full text-white w-28 hover:bg-blue-500">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
