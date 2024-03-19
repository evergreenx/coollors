import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo.svg";
import Link from "next/link";

export default function Header() {
  return (
    <div className="p-4 border-b-2  w-full bg-white z-10">
      <Link href={"/"}>
        <Image src={Logo} alt="logo" />
      </Link>
    </div>
  );
}
