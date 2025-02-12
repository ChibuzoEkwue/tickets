"use client";

import { TicketIcon } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Ticket = () => {
  const { control } = useFormContext<z.infer<typeof ticketSchema>>();

  return (
    <div className="flex flex-col items-center gap-6">
      {/* TICKET POSTER */}
      <div className="animate-fadeIn flex min-h-[200px] w-full max-w-[500px] flex-col items-center justify-between gap-3 rounded-lg border border-gray-400 p-6 text-center">
        <h1 className="text-lg font-bold text-black md:text-xl">
          🚀 FutureCode Summit 2025 – Where Innovation Meets the Future!
        </h1>
        <h3 className="text-base font-thin text-gray-500 md:text-lg">
          The FutureCode Summit 2025 is the ultimate gathering of developers
        </h3>
      </div>

      {/* TICKET TYPE SELECTION */}
      <div className="w-full max-w-[500px]">
        <FormField
          control={control}
          name="ticket_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-2 flex items-center gap-2 text-sm text-gray-400 md:text-base">
                <TicketIcon className="text-gray-500" /> Select Your Ticket
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value ?? ""} // Ensure fallback value
                  className="grid gap-2 sm:grid-cols-2 md:grid-cols-3"
                >
                  {["Regular Access", "VIP Access", "VVIP Access"].map(
                    (type) => (
                      <FormItem
                        key={type}
                        className="flex items-center space-x-3 rounded-lg border border-gray-500 p-3 text-black"
                      >
                        <FormControl>
                          <RadioGroupItem value={type} />
                        </FormControl>
                        <FormLabel className="cursor-pointer">{type}</FormLabel>
                      </FormItem>
                    ),
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* NUMBER OF TICKETS */}
      <div className="flex w-full max-w-[500px] flex-col gap-3">
        <FormField
          control={control}
          name="number_of_tickets"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="mb-2 text-sm text-gray-400 md:text-base">
                🎟 Select Number of Tickets
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value ? field.value.toString() : "1"} // Controlled component fix
                >
                  <SelectTrigger className="w-full border border-gray-500">
                    <SelectValue placeholder="Select a number" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem
                        key={num}
                        value={num.toString()}
                        className="hover:bg-gray-700"
                      >
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Ticket;
