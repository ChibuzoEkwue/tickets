"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ticketSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import FormHeader from "./form-header";
import FormFooter from "./form-footer";
import Render from "./render";
import { useTicketStore } from "@/lib/store";
import { steps } from "@/steps";



const TicketForm = () => {
  const { formData, updateFormData } = useTicketStore(); 

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: formData,
  });

  // Watch form fields and update Zustand on change
  useEffect(() => {
    const subscription = form.watch((values) => {
      updateFormData(values);
    });

    return () => subscription.unsubscribe();
  }, [form, form.watch, updateFormData]);

  const handleSubmit = (values: z.infer<typeof ticketSchema>) => {
    console.log("Final Form Data:", values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto w-full space-y-6 lg:w-2/3"
      >
        <FormHeader steps={steps} />
        <Render steps={steps} />
        <FormFooter steps={steps} />
      </form>
    </Form>
  );
};

export default TicketForm;
