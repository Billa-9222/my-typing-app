import Link from "next/link";

export default function Testsbox({ boxClass = "", wrapperClass = "", paraClass = "", buttonClass = "" }) {

  return (
    <div>
      <h2 className="text-white text-3xl mt-10 mb-2">Time Tests</h2>
      <div className={`${wrapperClass}`}>
        <div
          className={`${boxClass}  bg-[#2850A5]  rounded-t-lg`}
        >
          <p className={`text-white font-bold text-center ${paraClass}`}>
            1 min Test
          </p>
          <Link href="/test?type=1min">
            <button
              className={`bg-[#C7FF00] w-24 h-8 rounded-lg ${buttonClass}`}
            >
              Start Test
            </button>
          </Link>
        </div>
        <div
          className={`${boxClass} bg-[#2850A5] `}
        >
          <p className={`text-white font-bold  text-center ${paraClass}`}>
            3 min Test
          </p>
          <Link href="/test?type=3min">
            <button
              className={`bg-[#C7FF00] w-24 h-8 rounded-lg ${buttonClass}`}
            >
              Start Test
            </button>
          </Link>
        </div>
        <div
          className={`${boxClass} bg-[#2850A5] rounded-b-lg`}
        >
          <p className={`text-white font-bold  text-center ${paraClass}`}>
            5 min Test
          </p>
          <Link href="/test?type=5min">
            <button
              className={`bg-[#C7FF00] w-24 h-8 rounded-lg ${buttonClass}`}
            >
              Start Test
            </button>
          </Link>
        </div>
      </div>
      <h2 className="text-white text-3xl mt-8 mb-2">Page Tests</h2>
      <div className={`${wrapperClass}`}>
        <div
          className={`${boxClass} bg-[#2850A5] rounded-t-lg`}
        >
          <p className={`text-white font-bold  text-center ${paraClass}`}>
            1 Page Test
          </p>
          <button className={`bg-[#C7FF00] w-24 h-8 rounded-lg ${buttonClass}`}>
            Start Test
          </button>
        </div>
        <div
          className={`${boxClass} bg-[#2850A5] `}
        >
          <p className={`text-white font-bold text-center ${paraClass}`}>
            2 Page Test
          </p>
          <button className={`bg-[#C7FF00] w-24 h-8 rounded-lg ${buttonClass}`}>
            Start Test
          </button>
        </div>
        <div
          className={`${boxClass} bg-[#2850A5]  rounded-b-lg`}
        >
          <p className={`text-white font-bold text-center ${paraClass}`}>
            3 Page Test
          </p>
          <button className={`bg-[#C7FF00] w-24 h-8 rounded-lg ${buttonClass}`}>
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}
