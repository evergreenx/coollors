"use client";
import { handleColorTextClass } from "@/lib/utils";
import { colord, extend } from "colord";
import React, { useState } from "react";
import namesPlugin from "colord/plugins/names";

extend([namesPlugin]);

export default function QuickView({ colors }: { colors: string[] }) {
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);



  const colorTextLumi = handleColorTextClass(`#${selectedColor}`);
  return (
    <>
      <div
        key={selectedColor}
        style={{
          backgroundColor: `#${selectedColor}`,
        }}
        className={` no-scrollbar overflow-auto max-h-52 font-medium m-0 p-3 w-full ${
          colorTextLumi === "white"
            ? "text-white"
            : "text-black"
        }
`}
      >
        <div className="p-[12px] cursor-pointer rounded-lg hover:bg-[#ffffff0d] ">
          <h4 className="text-xs opacity-[0.4] mb-2 uppercase ">name</h4>
          <p className="text-sm font-medium capitalize">
            ~{colord(`#${selectedColor}`).toName({ closest: true })}
          </p>
        </div>
        <div className="p-[12px] cursor-pointer rounded-lg hover:bg-[#ffffff0d] ">
          <h4 className="text-xs opacity-[0.4] mb-2 uppercase ">Hex</h4>
          <p className="text-sm font-medium">
            {colord(`#${selectedColor}`).toHex()}
          </p>
        </div>

        <div className="p-[12px] cursor-pointer rounded-lg hover:bg-[#ffffff0d] ">
          <h4 className="text-xs opacity-[0.4] mb-2 uppercase ">HSL</h4>
          <p className="text-sm font-medium">
            {colord(`#${selectedColor}`).toHslString()}
          </p>
        </div>

        <div className="p-[12px] cursor-pointer rounded-lg hover:bg-[#ffffff0d] ">
          <h4 className="text-xs opacity-[0.4] mb-2 uppercase ">RGB</h4>
          <p className="text-sm font-medium">
            {colord(`#${selectedColor}`).toRgbString()}
          </p>
        </div>
      </div>
      <div className="relative bottom-0 left-0  rounded-lg  flex  px-3 pb-4 pt-1   w-full">
        {colors.map((color: string, index: number) => {
          return (
            <div
              key={index}
              onClick={() => {
                setSelectedColor(color);
              }}
              style={{
                backgroundColor: `#${color}`,
              }}
              className="flex-1 flex justify-center items-center cursor-pointer w-fit first:rounded-l-lg last:rounded-r-lg   h-[42px]"
            >
              {selectedColor === color && (
                <div
                  className={`
                ${
                  handleColorTextClass(`#${color}`) === "white"
                    ? "bg-white"
                    : "bg-black"
                }
                h-2 w-2 rounded-full bg-black`}
                ></div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
