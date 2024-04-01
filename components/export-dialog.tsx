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

import { Share2Icon, ShareIcon, X } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import ExportPalettes from "./export-palettes";
import { Margin, usePDF } from "react-to-pdf";

export function ExportDialog({
  handleExportPdf,
  targetRef
}: {
  handleExportPdf: () => void;
  targetRef : React.MutableRefObject<any>
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="" asChild>
          <Button className="border-none" variant="outline">
            <Share2Icon className="mr-2 w-[18px]" />
            Export
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]  p-2">
          <DialogHeader className="px-2 py-2">
            <DialogTitle className="text-center">Export Palette</DialogTitle>
            <DialogClose
              asChild
              className="absolute top-5 left-5 cursor-pointer "
            >
              <X width={20} />
            </DialogClose>

            {/* <Button onClick={toPDF}>Download PDF</Button> */}
          </DialogHeader>
          {/* two differnt comp */}

          <ExportPalettes targetRef={targetRef} handleExportPdf={handleExportPdf} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="border-none" variant="outline">
          <Share2Icon className="mr-2 w-[18px]" />
          
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-[425px] p-2">
        <DrawerHeader className="">
          <DialogTitle className="text-left">Export Palette</DialogTitle>
        </DrawerHeader>

        <ExportPalettes targetRef={targetRef} handleExportPdf={handleExportPdf} setOpen={setOpen} />
      </DrawerContent>
    </Drawer>
  );
}
