import { useParams } from "next/navigation";
import React from "react";
import { colord, extend, random } from "colord";
import namesPlugin from "colord/plugins/names";
import a11yPlugin from "colord/plugins/a11y";

extend([a11yPlugin]);
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ViewDialog } from "@/components/view-dialog";
import { handleColorTextClass } from "@/lib/utils";
extend([namesPlugin]);
export default function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const selecteColors = params.slug;


  random().toHex();

  const colors: undefined | any = selecteColors && selecteColors.split("-");

  const handleColorName = (colorHex: string) => {
    console.log(colorHex, "colorHex");

    let addHex: string = `#${colorHex}`;

    return colord(addHex).toName({ closest: true });
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex justify-end w-full">
        <ViewDialog colors={colors} />
      </div>

      <div className="flex lg:flex-row flex-col">
        {colors.map((color: string, index: number) => (
          <div
            key={index}
            className="w-full lg:h-screen h-40 flex px-[5px] relative"
            style={{
              backgroundColor: `#${color}`,
            }}
          >
            <div className=" absolute bottom-16 left-0  flex  items-center flex-col w-full mb-1">
              <h3
                className={` text-[30px] uppercase font-semibold ${handleColorTextClass(
                  color
                )}
 `}
              >
                {color}
              </h3>

              <p
                className={` ${handleColorTextClass(
                  color
                )} text-[11px] opacity-[0.5] capitalize inset-0 mt-[9px] `}
              >
                {handleColorName(color)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
