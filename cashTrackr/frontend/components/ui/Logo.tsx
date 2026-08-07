import Image from "next/image";
import logo from "@/public/logo.svg";

export default function Logo() {
  return (
    <Image
      src={logo}
      alt={"Cashtrackr logo"}
      className="w-full h-auto"
      loading="eager"
    />
  );
}
