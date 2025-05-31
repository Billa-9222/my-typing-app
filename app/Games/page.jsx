import Image from "next/image";
import comingSoon3 from "@/app/assets/images/comingSoon3.jpg";


export default function Games() {
    return (
      <div className="container mx-auto " >
        <Image src={comingSoon3} alt="img" className="w-screen h-screen"/>
      </div>
    );
}