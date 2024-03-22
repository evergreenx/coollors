import React from "react";
import { CopyIcon, CancelIcon, DragIcon, LockIcon, OpenIcon } from "./icons";
import { handleColorTextClass } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { DragControls, Reorder, useDragControls } from "framer-motion";

import useCopy from "@/hooks/use-copy";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useToast } from "@/components/ui/use-toast";

export default function Options({
  color,
  controls,
  toogleHex,
  lockedHexes,
}: {
  color: string;
  controls: DragControls;
  toogleHex: (color: string) => void;
  lockedHexes: string[];
}) {
  const currentColor =
    handleColorTextClass(color) === "white" ? "white" : "black";

  const router = useRouter();

  const textToCopy = "Hello, world!";

  const { copy } = useCopy();

  const { slug } = useParams<{ slug: string }>();

  const handleRemoveColor = (colorToRemove: string) => {
    console.log(colorToRemove);
    const colors = slug.split("-");
    const updatedColors = colors.filter((c) => c !== colorToRemove);

    const newRoute = updatedColors.join("-");

    router.replace(newRoute);
  };

  const { toast } = useToast();

  const handleHexCopy = (color: string) => {
    copy(color);
    toast({
      title: "color copied to the clipboard",
    });
  };
  return (
    <div>
      <div className="flex flex-col space-y-4 ">
        {slug.split("-").length > 2 && (
          <div onClick={() => handleRemoveColor(color)} className="m">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <CancelIcon currentColor={currentColor} />
                </TooltipTrigger>

                <TooltipContent>Remove</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        <div onClick={() => handleHexCopy(color)} className="">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {" "}
                <CopyIcon currentColor={currentColor} />
              </TooltipTrigger>

              <TooltipContent>Copy Hex</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div
          onPointerDown={(e) => {
            controls.start(e);

            e.preventDefault();
          }}
          className=""
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {" "}
                <DragIcon currentColor={currentColor} />
              </TooltipTrigger>

              <TooltipContent>Drag</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div onClick={() => toogleHex(color)} className="">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {lockedHexes?.includes(color) ? (
                  <LockIcon currentColor={currentColor} />
                ) : (
                  <OpenIcon currentColor={currentColor} />
                )}
              </TooltipTrigger>

              <TooltipContent>Togle lock</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
