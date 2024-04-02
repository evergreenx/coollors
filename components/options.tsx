import React from "react";
import { CopyIcon, CancelIcon, DragIcon, LockIcon, OpenIcon } from "./icons";
import { handleColorTextClass } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

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
  toogleHex,
  lockedHexes,
  setDraggable,
}: {
  color: string;
  toogleHex: (color: string) => void;
  lockedHexes: string[];
  setDraggable: (value: boolean) => void;
}) {
  const currentColor =
    handleColorTextClass(color) === "white" ? "white" : "black";

  const router = useRouter();

  const { copy } = useCopy();

  const { slug } = useParams<{ slug: string }>();

  const handleRemoveColor = (colorToRemove: string) => {

    const colors = slug.split("-");
    const updatedColors = colors.filter((c) => c !== colorToRemove.replace(/^#/, ''));

    console.log(updatedColors)

    const newRoute = updatedColors.join("-");

    router.replace(newRoute);
  };

  const { toast } = useToast();

  const handleHexCopy = (color: string) => {
    copy(color);
    toast({
      title: "Color copied to the clipboard!",
    });
  };
  return (
 
      <div className="flex flex-row lg:flex-col lg:space-y-4 space-y-0 space-x-4 lg:space-x-0  
       items-center   ">
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
          onMouseEnter={() => setDraggable(true)}
          onMouseLeave={() => setDraggable(false)} // retain this for better animation
          onTouchStart={() => setDraggable(true)}
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
  
  );
}
