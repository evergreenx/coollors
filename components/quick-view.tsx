"use client";
import { handleColorTextClass } from "@/lib/utils";
import React, { useState } from "react";

export default function QuickView({ colors }: { colors: string[] }) {
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  return (
    <>
      <div
        style={{
          backgroundColor: `#${selectedColor}`,
        }}
        className={` no-scrollbar overflow-auto max-h-36  m-0 p-3 w-full ${handleColorTextClass(
          selectedColor
        )}
`}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt
        fugiat tenetur aut consequatur optio molestiae est voluptas veritatis,
        voluptatibus laudantium, mollitia, dicta ullam beatae. Qui eveniet ea
        odio quaerat. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Illo incidunt fugiat tenetur aut consequatur optio molestiae est
        voluptas veritatis, voluptatibus laudantium, mollitia, dicta ullam
        beatae. Qui eveniet ea odio quaerat.
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
                <div className="h-2 w-2 rounded-full bg-black"></div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
