"use client";
import React from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";

import { ViewDialog } from "@/components/view-dialog";
import { handleColorTextClass } from "@/lib/utils";
import { motion } from "framer-motion";
import Options from '@/components/options'
extend([namesPlugin]);
export default function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const selecteColors = params.slug;

  const colors: undefined | any = selecteColors && selecteColors.split("-");

  const handleColorName = (colorHex: string) => {
    let addHex: string = `#${colorHex}`;

    return colord(addHex).toName({ closest: true });
  };

  const variant = {
    start: {},
    show: {},
  };

  const childvariant = {
    start: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex justify-end w-full">
        <ViewDialog colors={colors} />
      </div>

      <div className="flex lg:flex-row flex-col">
        {colors.map((color: string, index: number) => (
          <motion.div
            key={index}
            initial={"start"}
            variants={variant}
            whileHover={"show"}
            className="w-full lg:h-screen h-40 flex justify-center items-center px-[5px] relative"
            style={{
              backgroundColor: `#${color}`,
            }}
          >
            <motion.div variants={childvariant} className="">
         <Options />
            </motion.div>

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
                ~{handleColorName(color)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
