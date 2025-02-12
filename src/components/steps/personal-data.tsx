"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { ticketSchema } from "../../../schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import ImageUploader from "../image-uploader";

const PersonalData = () => {
  const { control } = useFormContext<z.infer<typeof ticketSchema>>();
  return (
    <div className="mx-auto w-full max-w-[500px] space-y-8">
      <ImageUploader />
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalData;
