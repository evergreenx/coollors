import React from "react";
import { CopyIcon, CancelIcon, DragIcon, LockIcon, OpenIcon } from "./icons";
import { handleColorTextClass } from "@/lib/utils";

export default function Options({ color }: { color: string }) {
  const currentColor =
    handleColorTextClass(color) === "white" ? "white" : "black";
  return (
    <div>
      <div className="flex flex-col space-y-7 ">
        <CancelIcon currentColor={currentColor} />
        <CopyIcon currentColor={currentColor} />
        <OpenIcon currentColor={currentColor} />
        <DragIcon currentColor={currentColor} />
        <LockIcon currentColor={currentColor} />
      </div>
    </div>
  );
}
