"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import typingBG from "@/app/assets/images/typingBG.jpg";

const TEST_TEXTS = [
  "Once upon a time, a perfectly good pizza was left in the oven and forgotten for exactly 73 minutes. What emerged was not food, but a crispy charcoal disc from the seventh circle of culinary hell. The smoke detector screamed, the dog barked, and the fire department politely suggested I order takeout next time. Moral of the story? Never 'just check Instagram for a minute' while cooking. Your taste buds and your ceiling paint will thank you.",
  "There is a secret interdimensional portal behind every dryer. You put in eight socks, you get back seven and a mysterious lint creature with attitude. No one knows where the missing socks go. I have a theory they become tiny scarves for cold snakes. Or maybe they join a sock rebellion in a parallel universe where laundry never ends. All I know is, I’ve given up matching them. If they want to disappear, let them live their tiny sock dreams.",
  "At the beach, a seagull looked me dead in the eye and stole my entire sandwich. No hesitation. Just wings, beak, and disrespect. I stood there in shock, lettuce still falling from the sky like sad confetti. Later, I saw that same bird sitting on a bench like he paid rent. He even had a french fry. I swear he winked at me. That was the day I realized seagulls aren’t birds. They’re beach gangsters with feathers.",
  "Octopuses are not just squishy sea noodles — they are criminal masterminds. One broke out of its tank at an aquarium, slithered across the floor, unscrewed a drain cover, and escaped into the ocean like a slimy Houdini. And they do this without bones. Imagine having the brain of a genius and the body of a stress ball. Scientists say they open jars, solve mazes, and probably know your browser history. If the ocean ever declares war on land, I guarantee an octopus will be leading the charge with eight clipboards and a vengeance.",
  "The Moon isn’t just floating up there like a peaceful nightlight. It has moonquakes — little tremors that shake its dusty face, probably from holding in laughter every time Earth makes a mess. It watches us build space rockets, forget where we put them, argue over Pluto, and then launch cheese-themed conspiracy theories. The Moon knows things. It’s been around for over four billion years and has seen every mistake we’ve made — including cargo shorts and pineapple on pizza. It never blinks. It only judges.",
];

function getDurationFromType(type) {
  if (type === "1min") return 60;
  if (type === "3min") return 180;
  if (type === "5min") return 300;
  return 60;
}

function InnerTestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "1min";
  const duration = getDurationFromType(type);

  const [testText, setTestText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [testEnded, setTestEnded] = useState(false);

  const inputRef = useRef(input);
  const testTextRef = useRef(testText);

  useEffect(() => {
    inputRef.current = input;
  }, [input]);

  useEffect(() => {
    testTextRef.current = testText;
  }, [testText]);

  useEffect(() => {
    const randomText =
      TEST_TEXTS[Math.floor(Math.random() * TEST_TEXTS.length)];
    setTestText(randomText);
  }, []);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(interval);

          const typed = inputRef.current;
          const text = testTextRef.current;

          const wordsTyped = typed.trim().split(/\s+/).filter(Boolean).length;
          const elapsedTime = (duration - prevTimeLeft + 1) / 60;
          const wpm =
            elapsedTime > 0 ? Math.round(wordsTyped / elapsedTime) : 0;

          const correctChars = text
            .split("")
            .filter((char, i) => typed[i] === char).length;
          const accuracy =
            typed.length > 0
              ? Math.round((correctChars / typed.length) * 100)
              : 0;

          localStorage.setItem("wpm", wpm.toString());
          localStorage.setItem("accuracy", accuracy.toString());

          const best = parseInt(localStorage.getItem("bestWPM") || "0");
          if (wpm > best) {
            localStorage.setItem("bestWPM", wpm.toString());
            localStorage.setItem("duration", duration.toString());
          }

          setTestEnded(true);
          return 0;
        }

        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    if (timeLeft === 0 && !testEnded) {
      router.push("/results");
    }
  }, [timeLeft, testEnded, router]);

  useEffect(() => {
    if (testEnded) {
      router.push("/results");
    }
  }, [testEnded, router]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!testText) return;
      if (!startTime) setStartTime(Date.now());

      setInput((prevInput) => {
        if (e.key === "Backspace") {
          return prevInput.slice(0, -1);
        } else if (e.key.length === 1 || e.key === " ") {
          return prevInput + e.key;
        }
        return prevInput;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [testText, startTime]);

  const radius = 90;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = ((duration - timeLeft) / duration) * 100;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="max-h-screen overflow-hidden">
      <Image src={typingBG} alt="img" className="w-screen h-screen relative" />

      <div className="bg-white text-lg flex flex-col items-center justify-center p-6">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="absolute top-32 right-20"
        >
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient
              id="greenYellowGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#C7FF00" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>

          <circle
            stroke="url(#blueGradient)"
            fill="white"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="url(#greenYellowGradient)"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{
              strokeDashoffset,
              transition: "stroke-dashoffset 1s linear",
            }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="20"
            fill="#000"
          >
            {timeLeft}s
          </text>
        </svg>

        <div className="bg-blue-50 p-6 rounded-lg top-36 max-w-4xl text-2xl font-mono leading-relaxed flex flex-wrap gap-1 absolute">
          {testText.split("").map((char, index) => {
            let color = "text-gray-400";
            if (index < input.length) {
              color = input[index] === char ? "text-green-500" : "text-red-500";
            }
            return (
              <span key={index} className={`${color} whitespace-pre-wrap`}>
                {char}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen text-2xl font-bold">
      Loading...
    </div>
  );
}

export default function TestPage() {
  return (
    <Suspense fallback={<Loading />}>
      <InnerTestPage />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";

// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import typingBG from "@/app/assets/images/typingBG.jpg";

// const TEST_TEXTS = [
//   "Once upon a time, a perfectly good pizza was left in the oven and forgotten for exactly 73 minutes. What emerged was not food, but a crispy charcoal disc from the seventh circle of culinary hell. The smoke detector screamed, the dog barked, and the fire department politely suggested I order takeout next time. Moral of the story? Never 'just check Instagram for a minute' while cooking. Your taste buds and your ceiling paint will thank you.",
//   "There is a secret interdimensional portal behind every dryer. You put in eight socks, you get back seven and a mysterious lint creature with attitude. No one knows where the missing socks go. I have a theory they become tiny scarves for cold snakes. Or maybe they join a sock rebellion in a parallel universe where laundry never ends. All I know is, I’ve given up matching them. If they want to disappear, let them live their tiny sock dreams.",
//   "At the beach, a seagull looked me dead in the eye and stole my entire sandwich. No hesitation. Just wings, beak, and disrespect. I stood there in shock, lettuce still falling from the sky like sad confetti. Later, I saw that same bird sitting on a bench like he paid rent. He even had a french fry. I swear he winked at me. That was the day I realized seagulls aren’t birds. They’re beach gangsters with feathers.",
//   "Octopuses are not just squishy sea noodles — they are criminal masterminds. One broke out of its tank at an aquarium, slithered across the floor, unscrewed a drain cover, and escaped into the ocean like a slimy Houdini. And they do this without bones. Imagine having the brain of a genius and the body of a stress ball. Scientists say they open jars, solve mazes, and probably know your browser history. If the ocean ever declares war on land, I guarantee an octopus will be leading the charge with eight clipboards and a vengeance.",
//   "The Moon isn’t just floating up there like a peaceful nightlight. It has moonquakes — little tremors that shake its dusty face, probably from holding in laughter every time Earth makes a mess. It watches us build space rockets, forget where we put them, argue over Pluto, and then launch cheese-themed conspiracy theories. The Moon knows things. It’s been around for over four billion years and has seen every mistake we’ve made — including cargo shorts and pineapple on pizza. It never blinks. It only judges.",
// ];

// function getDurationFromType(type) {
//   if (type === "1min") return 60;
//   if (type === "3min") return 180;
//   if (type === "5min") return 300;
//   return 60;
// }

// export default function TestPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const type = searchParams.get("type") || "1min";
//   const duration = getDurationFromType(type);

//   const [testText, setTestText] = useState("");
//   const [input, setInput] = useState("");
//   const [startTime, setStartTime] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(duration);
//   const [testEnded, setTestEnded] = useState(false);

//   const inputRef = useRef(input);
//   const testTextRef = useRef(testText);

//   useEffect(() => {
//     inputRef.current = input;
//   }, [input]);

//   useEffect(() => {
//     testTextRef.current = testText;
//   }, [testText]);

//   useEffect(() => {
//     const randomText =
//       TEST_TEXTS[Math.floor(Math.random() * TEST_TEXTS.length)];
//     setTestText(randomText);
//   }, []);

//   useEffect(() => {
//     if (!startTime) return;

//     const interval = setInterval(() => {
//       setTimeLeft((prevTimeLeft) => {
//         if (prevTimeLeft <= 1) {
//           clearInterval(interval);

//           const typed = inputRef.current;
//           const text = testTextRef.current;

//           const wordsTyped = typed.trim().split(/\s+/).filter(Boolean).length;
//           const elapsedTime = (duration - prevTimeLeft + 1) / 60;
//           const wpm =
//             elapsedTime > 0 ? Math.round(wordsTyped / elapsedTime) : 0;

//           const correctChars = text
//             .split("")
//             .filter((char, i) => typed[i] === char).length;
//           const accuracy =
//             typed.length > 0
//               ? Math.round((correctChars / typed.length) * 100)
//               : 0;

//           localStorage.setItem("wpm", wpm.toString());
//           localStorage.setItem("accuracy", accuracy.toString());

//           const best = parseInt(localStorage.getItem("bestWPM") || "0");
//           if (wpm > best) {
//             localStorage.setItem("bestWPM", wpm.toString());
//             localStorage.setItem("duration", duration.toString());
//           }

//           setTestEnded(true);
//           return 0;
//         }

//         return prevTimeLeft - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [startTime]);

//   useEffect(() => {
//     if (timeLeft === 0 && !testEnded) {
//       router.push("/results");
//     }
//   }, [timeLeft, testEnded, router]);

//   useEffect(() => {
//     if (testEnded) {
//       router.push("/results");
//     }
//   }, [testEnded, router]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!testText) return;
//       if (!startTime) setStartTime(Date.now());

//       setInput((prevInput) => {
//         if (e.key === "Backspace") {
//           return prevInput.slice(0, -1);
//         } else if (e.key.length === 1 || e.key === " ") {
//           return prevInput + e.key;
//         }
//         return prevInput;
//       });
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [testText, startTime]);

//   const radius = 90;
//   const stroke = 10;
//   const normalizedRadius = radius - stroke * 2;
//   const circumference = normalizedRadius * 2 * Math.PI;
//   const percent = ((duration - timeLeft) / duration) * 100;
//   const strokeDashoffset = circumference - (percent / 100) * circumference;

//   return (
//     <div className="max-h-screen overflow-hidden">
//       <Image src={typingBG} alt="img" className="w-screen h-screen relative" />

//       <div className="bg-white text-lg flex flex-col items-center justify-center p-6">
//         <svg
//           height={radius * 2}
//           width={radius * 2}
//           className="absolute top-32 right-20"
//         >
//           <defs>
//             <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#60a5fa" />
//               <stop offset="100%" stopColor="#1e3a8a" />
//             </linearGradient>
//             <linearGradient
//               id="greenYellowGradient"
//               x1="0%"
//               y1="0%"
//               x2="100%"
//               y2="0%"
//             >
//               <stop offset="0%" stopColor="#C7FF00" />
//               <stop offset="100%" stopColor="#FFD700" />
//             </linearGradient>
//           </defs>

//           <circle
//             stroke="url(#blueGradient)"
//             fill="white"
//             strokeWidth={stroke}
//             r={normalizedRadius}
//             cx={radius}
//             cy={radius}
//           />
//           <circle
//             stroke="url(#greenYellowGradient)"
//             fill="transparent"
//             strokeWidth={stroke}
//             strokeDasharray={`${circumference} ${circumference}`}
//             style={{
//               strokeDashoffset,
//               transition: "stroke-dashoffset 1s linear",
//             }}
//             r={normalizedRadius}
//             cx={radius}
//             cy={radius}
//           />
//           <text
//             x="50%"
//             y="50%"
//             dominantBaseline="middle"
//             textAnchor="middle"
//             fontSize="20"
//             fill="#000"
//           >
//             {timeLeft}s
//           </text>
//         </svg>

//         <div className="bg-blue-50 p-6 rounded-lg top-36 max-w-4xl text-2xl font-mono leading-relaxed flex flex-wrap gap-1 absolute">
//           {testText.split("").map((char, index) => {
//             let color = "text-gray-400";
//             if (index < input.length) {
//               color = input[index] === char ? "text-green-500" : "text-red-500";
//             }
//             return (
//               <span key={index} className={`${color} whitespace-pre-wrap`}>
//                 {char}
//               </span>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export const dynamic = "force-dynamic";
