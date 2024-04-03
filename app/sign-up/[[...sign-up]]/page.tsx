import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function Page() {
  return (
    <div className="flex h-screen justify-center">
      <div className="mt-20">

      <SignUp />
      </div>
    </div>
  );
}
