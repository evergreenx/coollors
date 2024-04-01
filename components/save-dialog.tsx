"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SavePalettes from "@/components/save-palettes-form";

import { X } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import HeartIcon from "@/assets/heart.svg";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";

export function SaveDialog({ colors }: { colors: string[] }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="" asChild>
          <Button className="border-none" variant="outline">
            <Image src={HeartIcon} alt="" className="mr-2" />
            Save
          </Button>
        </DialogTrigger>
        <DialogContent
          onKeyDown={(event: any) => {
            event.stopPropagation();
          }}
          className="sm:max-w-[425px] pointer-events-none  p-5"
        >
          <DialogHeader className="px-2 py-2">
            <DialogTitle className="text-center">Save Palette</DialogTitle>
            <DialogClose
              asChild
              className="absolute top-5 left-5 cursor-pointer "
            >
              <X width={20} />
            </DialogClose>
          </DialogHeader>
          {/* two differnt comp */}

          <SavePalettes setOpen={setOpen} colors={colors} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="border-none" variant="outline">
          <Image src={HeartIcon} alt="" className="mr-2" />
        </Button>
      </DrawerTrigger>
      <DrawerContent 
       onKeyDown={(event: any) => {
        event.stopPropagation();
      }}
      className="sm:max-w-[425px] p-2">
        <DrawerHeader className="">
          <DialogTitle className="text-left">Save Palette</DialogTitle>
        </DrawerHeader>

        <SavePalettes setOpen={setOpen} colors={colors} />
      </DrawerContent>
    </Drawer>
  );
}
