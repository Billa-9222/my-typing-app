"use client";
import Image from "next/image";
import login10 from "@/app/assets/images/login10.jpg";
import instagram from "@/app/assets/images/instagram.svg";
import facebook from "@/app/assets/images/facebook.svg";
import google from "@/app/assets/images/google.svg";
import Link from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username.trim() !== "") {
      login(username);
      router.push("/HomePage");
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center ">
      <div>
        <Image
          src={login10}
          alt="loginBG"
          className="relative w-screen h-screen"
        />
      </div>

      <div className="absolute p-0.5 bg-gradient-to-r from-[#C7FF00] via-cyan-400 to-lime-400 rounded-lg animate-border mt-32">
        <div className="flex flex-col items-center w-[350px] gap-6 pt-10 pb-10 backdrop-blur-3xl rounded-lg bg-[#0B0A2A] bg-opacity-60">
          <div className="flex items-center w-80 border border-blue-300 rounded-lg bg-blue-400 gap-4">
            <Image src={google} alt="img" />
            <p className="text-white">Sign in with Google</p>
          </div>
          <div className="flex items-center w-80 border border-blue-300 rounded-lg bg-blue-400 gap-4">
            <Image src={facebook} alt="img" />
            <p className="text-white">Sign in with Facebook</p>
          </div>
          <div className="flex items-center w-80 border border-blue-300 rounded-lg bg-blue-400 gap-4">
            <Image src={instagram} alt="img" />
            <p className="text-white">Sign in with Instagram</p>
          </div>
          <div className="flex items-center w-80">
            <div className="flex-grow h-px bg-blue-400" />
            <span className="mx-4 text-blue-300">OR</span>
            <div className="flex-grow h-px bg-blue-400" />
          </div>
          <div>
            <input
              type="text"
              name="userName"
              placeholder="Username or Email"
              className="flex items-center w-80 border border-blue-300 rounded-lg p-2 text-white mb-6"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="flex items-center w-80 border border-blue-300 rounded-lg p-2 text-white mb-6"
            />
            <button
              onClick={handleLogin}
              className="flex items-center justify-center w-80 border border-blue-300 bg-blue-400 rounded-lg p-2 text-white hover:bg-blue-500"
            >
              Sign in
            </button>
          </div>

          <div className="text-blue-300 pl-36">
            <Link href="/ForgotPassword" className="hover:underline">
              Forgot your password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import Image from "next/image";
// import login10 from "@/app/assets/images/login10.jpg";
// import instagram from "@/app/assets/images/instagram.svg";
// import facebook from "@/app/assets/images/facebook.svg";
// import google from "@/app/assets/images/google.svg";
// import Link from "next/link";
// import { useContext, useState } from "react";
// import { useRouter } from "next/navigation";
// import { UserContext } from "../context/UserContext";

// export default function Login() {
//   const { login } = useContext(UserContext);
//   const [username, setUsername] = useState("");
//   const router = useRouter();

//   const handleLogin = () => {
//     if (username.trim() !== "") {
//       login(username);
//       router.push("/HomePage"); // Redirect after login
//     }
//   };

//   return (
//     <div className="container mx-auto flex items-center justify-center ">
//       <div>
//         <Image
//           src={login10}
//           alt="loginBG"
//           className="relative w-screen h-screen "
//         />
//       </div>
//       <div className="absolute border border-white border-glow flex flex-col items-center  w-1/4 gap-6 pt-10 pb-10 backdrop-blur-3xl rounded-lg mt-18">
//         <div className="flex items-center w-80 border border-blue-300 rounded-lg bg-blue-400 gap-4">
//           <Image src={google} alt="img" />
//           <p className="text-white">Sign in with Google</p>
//         </div>
//         <div className="flex items-center w-80 border border-blue-300 rounded-lg bg-blue-400 gap-4">
//           <Image src={facebook} alt="img" />
//           <p className="text-white">Sign in with Facebook</p>
//         </div>
//         <div className="flex items-center w-80 border border-blue-300 rounded-lg bg-blue-400 gap-4">
//           <Image src={instagram} alt="img" />
//           <p className="text-white">Sign in with Instagram</p>
//         </div>
//         <div className="flex items-center w-80">
//           <div className="flex-grow h-px bg-blue-400" />
//           <span className="mx-4 text-blue-300">OR</span>
//           <div className="flex-grow h-px bg-blue-400" />
//         </div>
//         <div>
//           <input
//             type="text"
//             name="userName"
//             placeholder="Username or Email"
//             className="flex items-center w-80 border border-blue-300 rounded-lg p-2 text-white mb-6"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="flex items-center w-80 border border-blue-300 rounded-lg p-2 text-white mb-6"
//           />
//           <button
//             onClick={handleLogin}
//             className="flex items-center justify-center w-80 border border-blue-300 bg-blue-400 rounded-lg p-2 text-white hover:bg-blue-500"
//           >
//             Sign in
//           </button>
//         </div>

//         <div className="text-blue-300 pl-36">
//           <Link href="/ForgotPassword" className="hover:underline">
//             Forgot your password?
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }
