"use client";
import React, { KeyboardEvent, MouseEvent, useEffect, useState } from "react";
import { extend } from "colord";
import namesPlugin from "colord/plugins/names";

import { ViewDialog } from "@/components/view-dialog";
import { SaveDialog } from "@/components/save-dialog";

import { ExportDialog } from "@/components/export-dialog";

import { useAnimate } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Reorder } from "framer-motion";
import randomColor from "randomcolor";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePDF } from "react-to-pdf";
import SavedPalettes from "@/components/saved-palettes";
import { MenuIcon, MenuSquare } from "lucide-react";
import Palette from "@/components/palettes";
extend([namesPlugin]);
export default function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const generatedColors = params.slug;

  const [scope, animate] = useAnimate();

  // TODO - fix type and namin of state
  const [lockedHexes, setLockedHexes] = useState<string[]>([]);

  const colors: undefined | string[] | any =
    generatedColors && generatedColors.split("-");

  const [colorPalettes, setColorPalattes] = useState(colors);

  console.log(colorPalettes)

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

    const allColors = [...lockedHexes, ...randomColors];

    console.log(allColors, "all colors");

    if (allColors.length >= 5) {
      const routeParam = allColors
        .slice(0, 5)
        .map((color) => color.replace("#", ""))
        .join("-");
      if (eventType === "keydown" || eventType === "click") {
        navigate.replace(`/color/${routeParam}`);
      }
    }
  };

  const [showSavedPalettes, setShowSavedPalettes] = useState(false);

  const { toPDF, targetRef } = usePDF({
    method: "save",
    filename: "palettes.pdf",
    page: { orientation: "landscape", format: "a5" },
  });

  useEffect(() => {
    animate(
      ".menuicon",

      {
        rotate: showSavedPalettes ? 90 : 0,
      }
    );
  }, [showSavedPalettes]);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const dynamicAxis = isDesktop ? "x" : "y";

  return (
    <div
      tabIndex={0}
      ref={scope}
      onKeyDown={(e) => handleGenerateNewPalette(e, "keydown")}
      className=" min-h-full relative  outline-none "
    >
      <div className="flex lg:absolute top-[4.1rem]  z-50  bg-white justify-between items-center w-full p-2  border-b-2 ">
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
        <div className="flex items-center">
          <ViewDialog colors={colors} />

          <SaveDialog colors={colors} />

          <ExportDialog targetRef={targetRef} handleExportPdf={toPDF} />

          <Button className="border-none " variant={"outline"}>
            <MenuIcon
              className="menuicon"
              onClick={() => {
                setShowSavedPalettes(!showSavedPalettes);
              }}
            />
          </Button>
        </div>
      </div>

      <div>
        <Reorder.Group
          ref={targetRef}
          className="flex lg:flex-row flex-col w-full  h-screen"
          axis={dynamicAxis}
          values={colorPalettes}
          onReorder={setColorPalattes}
        >
          {colorPalettes.map((color: string, index: number) => (
            <Palette
              color={color}
              setLockedHexes={setLockedHexes}
              lockedHexes={lockedHexes}
              key={color}
              colorIndex={index}
              colors={colors}
            />
          ))}

          {showSavedPalettes ? (
            <SavedPalettes setShowSavedPalettes={setShowSavedPalettes} />
          ) : null}
        </Reorder.Group>
      </div>
    </div>
  );
}
