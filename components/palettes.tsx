import { useMediaQuery } from "@/hooks/use-media-query";
import { columVariant, columnChildVariant } from "@/variant";
import { AnimatePresence, Reorder, motion } from "framer-motion";

import React, { useState } from "react";
import Options from "./options";
import { handleColorTextClass } from "@/lib/utils";
import { colord } from "colord";

export default function Palette({
  color,
  lockedHexes,
  setLockedHexes,
}: {
  color: string;
  lockedHexes: string[];
  setLockedHexes: (value: string[]) => void;
}) {
  const [draggable, setDraggable] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");



  const handleColorName = (colorHex: string) => {
    let addHex: string = `#${colorHex}`;

    return colord(addHex).toName({ closest: true });
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
        backgroundColor: `#${color}`,
      }}
    >
      {isDesktop ? (
        <motion.div variants={columnChildVariant} className="">
          <Options
            toogleHex={handleToggleHex}
            lockedHexes={lockedHexes}
            color={color}
            setDraggable={setDraggable}
          />
        </motion.div>
      ) : (
        <Options
          toogleHex={handleToggleHex}
          lockedHexes={lockedHexes}
          color={color}
          setDraggable={setDraggable}
        />
      )}

      <div
        className={`lg:absolute static bottom-16 left-0  flex
${handleColorTextClass(color) === "white" ? "text-white" : "text-black"}
lg:items-center flex-col w-full mb-1`}
      >
        <h3
          className={` text-xl  lg:text-[30px] uppercase font-semibold 
`}
        >
          {color}

          <br />
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
  );
}
