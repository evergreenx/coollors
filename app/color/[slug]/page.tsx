import { useParams } from "next/navigation";
import React from "react";
import { colord, extend, random } from "colord";
import namesPlugin from "colord/plugins/names";
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
extend([namesPlugin]);
export default function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const selecteColors = params.slug;
  console.log(params.slug);

  random().toHex();

  const colors: undefined | any = selecteColors && selecteColors.split("-");

  const handleColorName = (colorHex: string) => {
    console.log(colorHex, "colorHex");

    let addHex: string = `#${colorHex}`;

    return colord(addHex).toName({ closest: true });
  };
  return (
    <div className="h-screen">
      <AlertDialog>
        <AlertDialogTrigger>
          Open
          <EyeIcon />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex">
        {colors.map((color: string, index: number) => (
          <div
            key={index}
            className="w-full h-screen flex px-[5px]"
            style={{
              backgroundColor: `#${color}`,
            }}
          >
            <div className="self-end flex justify-center items-center flex-col w-full mb-1 ">
              <h3 className=" text-[30px] font-semibold  text-white ">
                {color}
              </h3>

              <p className=" text-[11px] opacity-[0.5] capitalize inset-0 text-white mt-[9px] ">
                {handleColorName(color)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
