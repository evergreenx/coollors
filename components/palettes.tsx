import { useMediaQuery } from "@/hooks/use-media-query";
import { columVariant, columnChildVariant } from "@/variant";
import { AnimatePresence, Reorder, motion } from "framer-motion";

import React, { useRef, useState } from "react";
import Options from "./options";
import { handleColorTextClass } from "@/lib/utils";
import { colord } from "colord";
import ReactGPicker from "react-gcolor-picker";
import { useClickOutside } from "@/hooks/use-click-outside";

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

  const handlesetColor = (color: string) => {
    const slicedColor = color.slice(0);
    setColorInstance(slicedColor);
    console.log(slicedColor);

    // valueToHex(color)
  };

  const onClickOutside = () => {
    setShowColorPicker(false);
  };

  const clickRef = useClickOutside(onClickOutside);

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
        <div className="bg-white p-2 absolute rounded-3xl   " ref={clickRef}>
          <ReactGPicker
            value={colorInstance}
            onChange={handlesetColor}
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
${
  handleColorTextClass(colorInstance) === "white" ? "text-white" : "text-black "
}



lg:items-center flex-col w-full mb-1`}
      >
        <h3
          className={` text-xl  lg:text-[30px] uppercase font-semibold cursor-pointer
`}
          onClick={() => setShowColorPicker(true)}
        >
          {colorInstance.replace(/^#/, "")}

          <br />
        </h3>

        <p
          className={` ${handleColorTextClass(
            color
          )} text-[11px] opacity-[0.5] capitalize inset-0 mt-[9px] `}
        >
          ~{handleColorName(colorInstance)}
        </p>
      </div>
    </Reorder.Item>
  );
}
