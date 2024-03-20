import React from "react";
import { CopyIcon, CancelIcon, DragIcon, LockIcon, OpenIcon } from "./icons";
import { handleColorTextClass } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Reorder, useDragControls } from "framer-motion";

export default function Options({
  color,
  controls,
}: {
  color: string;
  controls: any;
}) {
  const currentColor =
    handleColorTextClass(color) === "white" ? "white" : "black";

  const router = useRouter();

  const { slug } = useParams<{ slug: string }>();

  const handleRemoveColor = (colorToRemove: string) => {
    console.log(colorToRemove);
    const colors = slug.split("-");
    const updatedColors = colors.filter((c) => c !== colorToRemove);

    const newRoute = updatedColors.join("-");

    router.replace(newRoute);
  };
  return (
    <div>
      <div className="flex flex-col space-y-4 ">
        {slug.split("-").length > 2 && (
          <div onClick={() => handleRemoveColor(color)} className="m">
            <CancelIcon currentColor={currentColor} />
          </div>
        )}
        <CopyIcon currentColor={currentColor} />
        <OpenIcon currentColor={currentColor} />

        <div
          onPointerDown={(e) => {
            controls.start(e);

            e.preventDefault();
          }}
          className=""
        >
          <DragIcon currentColor={currentColor} />
        </div>

        <LockIcon currentColor={currentColor} />
      </div>
    </div>
  );
}
