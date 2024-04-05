import { useMediaQuery } from "@/hooks/use-media-query";
import { columVariant, columnChildVariant } from "@/variant";
import { AnimatePresence, Reorder, motion } from "framer-motion";

import React, { useRef, useState } from "react";
import Options from "./options";
import { handleColorTextClass } from "@/lib/utils";
import { colord } from "colord";
import ReactGPicker from "react-gcolor-picker";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";

export default function Palette({
  color,
  colors,
  lockedHexes,
  colorIndex,
  setLockedHexes,
}: {
  color: string;
  colors: string[];
  lockedHexes: string[];
  colorIndex: number;
  setLockedHexes: (value: string[]) => void;
}) {
  const [draggable, setDraggable] = useState(false);

  const [colorInstance, setColorInstance] = useState(`#${color}`);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleColorName = (colorHex: string) => {
    return colord(colorHex).toName({ closest: true });
  };

  const handleToggleHex = (hex: string) => {
    if (lockedHexes.includes(hex)) {
      // If the hex is already locked, unlock it
      setLockedHexes(lockedHexes.filter((h) => h !== hex));
    } else {
      // Otherwise, lock it
      setLockedHexes([...lockedHexes, hex]);
    }
  };

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newColorPalettes, setNewColorPalettes] = useState<string[]>([]);

  const handlesetColor = (color: string, index: number) => {
    console.log(color);

    if (!color) {
      setNewColorPalettes(["fff", "ddd"]);
    }

    const newColor = color.replace(/^#/, "");

    console.log(newColor);
    if (newColor) {
      const newColors = [...colors];

      newColors[index] = newColor;

      console.log(newColors);

      setNewColorPalettes(newColors);
    }

    setColorInstance(color);
  };

  const navigate = useRouter();

  // click outside color picker
  const onClickOutside = () => {
    console.log(newColorPalettes); 

    // replace route if newcolorpalettes is selected
    if (newColorPalettes.length) {
      const newRoute = newColorPalettes.join("-");

      console.log(newRoute);
      navigate.replace(`/color/${newRoute}`);
    }

    setShowColorPicker(false);
  };

  const clickRef = useClickOutside(onClickOutside);

  const colorName = handleColorName(colorInstance);
  const colorTextLumi = handleColorTextClass(colorInstance);

  return (
    <Reorder.Item
      value={color}
      key={color}
      initial={"start"}
      dragListener={draggable}
      onDragEnd={() => setDraggable(false)}
      variants={columVariant}
      whileHover={"show"}
      className="w-full lg:h-screen h-full   flex flex-row-reverse justify-center items-center px-[5px] relative"
      style={{
        backgroundColor: `${colorInstance}`,
      }}
    >
      {isDesktop ? (
        <motion.div variants={columnChildVariant} className="">
          <Options
            toogleHex={handleToggleHex}
            lockedHexes={lockedHexes}
            color={colorInstance}
            setDraggable={setDraggable}
          />
        </motion.div>
      ) : (
        <Options
          toogleHex={handleToggleHex}
          lockedHexes={lockedHexes}
          color={colorInstance}
          setDraggable={setDraggable}
        />
      )}

      {showColorPicker ? (
        <div className=" p-2 absolute rounded-3xl z-50   " ref={clickRef}>
          <ReactGPicker
            value={colorInstance}
            onChange={(value) => handlesetColor(value, colorIndex)}
            showAlpha={false}
            gradient={false}
            format="hex"
          />
        </div>
      ) : (
        ""
      )}

      <div
        className={`lg:absolute static bottom-16 left-0  flex
${colorTextLumi === "white" ? "text-white" : "text-black "}
lg:items-center flex-col w-full mb-1`}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <h3
                className={` text-xl  lg:text-[30px] uppercase font-semibold cursor-pointer text-left
`}
                onClick={() => setShowColorPicker(true)}
              >
                {colorInstance.replace(/^#/, "")}

                <br />
              </h3>
            </TooltipTrigger>

            <TooltipContent>Select color</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <p
          className={`  text-[11px] opacity-[0.5] capitalize inset-0 mt-[9px] `}
        >
          ~{colorName}
        </p>
      </div>
    </Reorder.Item>
  );
}
