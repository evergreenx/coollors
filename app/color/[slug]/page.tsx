"use client";
import React, { useState } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";

import { ViewDialog } from "@/components/view-dialog";
import { handleColorTextClass } from "@/lib/utils";
import { motion, useDragControls } from "framer-motion";
import Options from "@/components/options";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Reorder } from "framer-motion";
extend([namesPlugin]);
export default function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const generatedColors = params.slug;

  // TODO - fix type and namin of state

  const colors: undefined | string[] | any =
    generatedColors && generatedColors.split("-");

  const [items, setItems] = useState(colors);
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

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const controls = useDragControls();

  const dynamicAxis = isDesktop ? 'x'  : 'y'

  return (
    <div className="h-screen overflow-hidden">
      <div className="flex justify-end w-full">
        <ViewDialog colors={colors} />
      </div>

      <div>
        <Reorder.Group
          className="flex lg:flex-row flex-col"
          axis={'x'}
          values={items}
          onReorder={setItems}
        >
          {items.map((color: string, index: number) => (
            <Reorder.Item
              value={color}
              key={color}
              initial={"start"}
              dragListener={false}
              dragControls={controls}
              variants={variant}
              whileHover={"show"}
              className="w-full lg:h-screen h-40 flex flex-row-reverse justify-center items-center px-[5px] relative"
              style={{
                backgroundColor: `#${color}`,
              }}
            >
              {isDesktop ? (
                <motion.div variants={childvariant} className="">
                  <Options color={color} controls={controls} />
                </motion.div>
              ) : (
                <Options color={color} controls={controls} />
              )}

              <div
                className={`lg:absolute static bottom-16 left-0  flex
            ${
              handleColorTextClass(color) === "white"
                ? "text-white"
                : "text-black"
            }
            lg:items-center flex-col w-full mb-1`}
              >
                <h3
                  className={` text-[30px] uppercase font-semibold 
 `}
                >
                  {color}

                  <br />
                  {/* {colord(`#${color}`).luminance()} */}
                </h3>

                <p
                  className={` ${handleColorTextClass(
                    color
                  )} text-[11px] opacity-[0.5] capitalize inset-0 mt-[9px] `}
                >
                  ~{handleColorName(color)}
                </p>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
