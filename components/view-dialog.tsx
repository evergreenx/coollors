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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import QuickView from "./quick-view";
import { X } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

export function ViewDialog({ colors }: { colors: string[] }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="" asChild>
          <Button variant="outline">View</Button>
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
        <Button variant="outline">View</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Quick view</DrawerTitle>
        </DrawerHeader>

        <div className=""></div>
        <QuickView colors={colors} />
      </DrawerContent>
    </Drawer>
  );
}
