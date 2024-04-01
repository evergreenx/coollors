import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="p-4 border-b-2  lg:absolute w-full h-[4.1rem] bg-white z-10">
      <div className="flex justify-between items-center">
        <Link href={"/"}>
          <Image src={Logo} alt="logo" />
        </Link>
        <UserButton />
      </div>
    </div>
  );
}
