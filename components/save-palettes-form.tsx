import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { client } from "@/config/client";
import { useToast } from "./ui/use-toast";
import { title } from "process";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),

  description: z.string().min(5, {
    message: "Description must be at least 5 characters",
  }),
});

export default function SavePalettesForm({
  colors,
  setOpen,
}: {
  colors: string[];
  setOpen: (value: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {toast} = useToast()


  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const newColors = colors.join("-");

    setLoading(true);

    try {
      await client.from("palettes").insert({
        title: values.title,
        desc: values.description,
        colors: newColors,
      });
    } catch (error) {
    } finally {
      setOpen(false);

      setLoading(false);

      toast(
       {
        title : 'color palette saved'
       }
      )
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8   ">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="My new palette" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            </>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="" className="resize-none" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            </>
          )}
        />

        <Button disabled={loading} className="w-full" type="submit">
          {loading ? "Saving" : "Save"}
        </Button>
      </form>
    </Form>
  );
}
