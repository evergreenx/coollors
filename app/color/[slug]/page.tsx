"use client";
import React, { KeyboardEvent, MouseEvent, useState } from "react";
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
import { Button } from "@/components/ui/button";
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

  const handleGenerateNewPalette = (
    e: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>,
    eventType: string
  ) => {
    if (
      eventType === "keydown" &&
      (e as KeyboardEvent<HTMLDivElement>).key !== " " &&
      (e as KeyboardEvent<HTMLDivElement>).key !== "Spacebar"
    ) {
      return; // If it's a keydown event and key is not space, return without doing anything
    }

    //get five differnt color
    const randomColors = Array.from({ length: 5 }, () =>
      randomColor({
        hue: "random",
        luminosity: "random",
      })
    );
    console.log(randomColors, "random");

    const allColors = [...lockedHexes, ...randomColors];

    console.log(allColors, "all colors");

    console.log(lockedHexes, "lockedhexes");
    console.log(unlockedColors, "unlcok");

    if (allColors.length >= 5) {
      const routeParam = allColors
        .slice(0, 5)
        .map((color) => color.replace("#", ""))
        .join("-");
      if (eventType === "keydown" || eventType === "click") {
        navigate.replace(`/color/${routeParam}`);
      }
    }

    // // Navigate only if it's a keydown event and spacebar was pressed, or if it's a click event
  };



  const [lockedHexes, setLockedHexes] = useState<string[]>([]);


  const handleToggleHex = (hex: string) => {
    if (lockedHexes.includes(hex)) {
      // If the hex is already locked, unlock it
      setLockedHexes(lockedHexes.filter((h) => h !== hex));
    } else {
      // Otherwise, lock it
      setLockedHexes([...lockedHexes, hex]);
    }
  };

  console.log(lockedHexes);

  const unlockedColors = items.filter(
    (color:string) => !lockedHexes.includes(color.slice(1))
  );

  console.log(unlockedColors, "tes");

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => handleGenerateNewPalette(e, "keydown")}
      className="h-screen overflow-hidden   outline-none"
    >
      <div className="flex justify-between items-center w-full p-3">
        <div className="">
          <p className="opacity-[0.5] hidden  lg:block">
            Press the spacebar to generate new color palettes
          </p>

          <Button
            onClick={(e) => handleGenerateNewPalette(e, "click")}
            className="lg:hidden block"
          >
            Generate
          </Button>
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
              {isDesktop ? (
                <motion.div variants={columnChildVariant} className="">
                  <Options
                    toogleHex={handleToggleHex}
                    lockedHexes={lockedHexes}
                    color={color}
                    controls={controls}
                  />
                </motion.div>
              ) : (
                <Options
                  toogleHex={handleToggleHex}
                  lockedHexes={lockedHexes}
                  color={color}
                  controls={controls}
                />
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
