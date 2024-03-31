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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function SaveDialog({ colors }: { colors: string[] }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger className="" asChild>
          <Button className="border-none" variant="outline">
            <Image src={HeartIcon} alt="" className="mr-2" />
            Save
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px] pointer-events-none  p-5 absolute dialog">
          <AlertDialogHeader className="px-2 py-2">
            <AlertDialogTitle className="text-center">
              Save Palette
            </AlertDialogTitle>
            <div className="absolute top-5 left-5 cursor-pointer ">
              <X width={20} />
            </div>
          </AlertDialogHeader>
          {/* two differnt comp */}

          <SavePalettes setOpen={setOpen} colors={colors} />
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="border-none" variant="outline">
          <Image src={HeartIcon} alt="" className="mr-2" />
          Save
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-[425px] p-2">
        <DrawerHeader className="">
          <DialogTitle className="text-left">Save Palette</DialogTitle>
        </DrawerHeader>

        <SavePalettes setOpen={setOpen} colors={colors} />
      </DrawerContent>
    </Drawer>
  );
}
