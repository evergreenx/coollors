"use client";
import React, { KeyboardEvent, useState } from "react";
import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";

import { ViewDialog } from "@/components/view-dialog";
import { handleColorTextClass } from "@/lib/utils";
import { motion, useDragControls } from "framer-motion";
import Options from "@/components/options";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Reorder } from "framer-motion";
import randomColor from "randomcolor";
import { useRouter } from "next/navigation";
import { columVariant, columnChildVariant } from "@/variant";
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

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const controls = useDragControls();

  const navigate = useRouter();

  const handleGenerateNewPalette = (e: KeyboardEvent<HTMLDivElement>) => {
    const randomColorx = randomColor({
      hue: "random",
      luminosity: "random",
      count: 5,
    });
    const routeParam = randomColorx
      ?.map((color: string) => color.slice(1))
      .join("-");
    if (e.key === " " || e.key === "Spacebar")
      navigate.replace(`/color/${routeParam}`);
  };

  const [lockedHexes, setLockedHexes] = useState([]);
  const handleToggleHex = (hex) => {
    if (lockedHexes.includes(hex)) {
      // If the hex is already locked, unlock it
      setLockedHexes(lockedHexes.filter((h) => h !== hex));
    } else {
      // Otherwise, lock it
      setLockedHexes([...lockedHexes, hex]);
    }
  };

  console.log(lockedHexes);

  return (
    <div
      tabIndex={0}
      onKeyDown={handleGenerateNewPalette}
      className="h-screen overflow-hidden   outline-none"
    >
      <div className="flex justify-between items-center w-full p-3">
        <div className="">
          <p className="opacity-[0.5]">
            Press the spacebar to generate new color palettes
          </p>
        </div>
        <ViewDialog colors={colors} />
      </div>

      <div>
        <Reorder.Group
          className="flex lg:flex-row flex-col"
          axis={"x"}
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
              variants={columVariant}
              whileHover={"show"}
              className="w-full lg:h-screen h-40 flex flex-row-reverse justify-center items-center px-[5px] relative"
              style={{
                backgroundColor: `#${color}`,
              }}
            >
              {/* <p onClick={() => handleToggleHex(color)}>
                {lockedHexes.includes(color:string) ? "lock" : "open"}
              </p> */}



              {isDesktop ? (
                <motion.div variants={columnChildVariant} className="">
                  <Options toogleHex={handleToggleHex} lockedHexes={lockedHexes} color={color} controls={controls} />
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
