"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import QuickView from "./quick-view";
import { X } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import EyeIcon from "@/assets/eye-open.svg";
import Image from "next/image";

export function ViewDialog({ colors }: { colors: string[] }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="" asChild>
          <Button className="border-none" variant="outline">
            <Image src={EyeIcon} alt="" className="mr-2" />
            View
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="px-2 pt-1 flex justify-center">
            <DialogClose asChild className="absolute cursor-pointer ">
              <X width={20} />
            </DialogClose>
            <DialogTitle className="text-center text-base">
              Quick view
            </DialogTitle>
          </DialogHeader>

          <QuickView colors={colors} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="border-none" variant="outline">
          <Image src={EyeIcon} alt="" className="mr-2" />
          
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Quick view</DrawerTitle>
        </DrawerHeader>

        <QuickView colors={colors} />
      </DrawerContent>
    </Drawer>
  );
}
