"use client";

import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { StepsType } from "../steps";
import { useTicketStore } from "@/lib/store";
import { useFormContext } from "react-hook-form";

const FormFooter = ({ steps }: { steps: StepsType[] }) => {
  const { trigger } = useFormContext();
  const { nextPage, prevPage, isFinal, currentPage } = useTicketStore(
    (state) => state,
  );

  const goBackHandler = () => prevPage();

  const nextBackHandler = async () => {
    if (!trigger) return; 
    const res = await trigger(steps[currentPage].fields, {
      shouldFocus: true,
    });
    console.log(res);

    if (!res) return;
    nextPage();
  };

  return (
    <div className="mt-4 flex h-12 w-full items-center justify-between">
      <Button
        type="button"
        className="flex items-center gap-2 px-4 py-2"
        onClick={goBackHandler}
        disabled={currentPage === 0} 
      >
        <ArrowLeft size={18} />
        Prev
      </Button>

      {isFinal ? (
        <Button type="submit" className="flex items-center gap-2 px-4 py-2">
          Submit
        </Button>
      ) : (
        <Button
          type="button"
          className="flex items-center gap-2 px-4 py-2"
          onClick={nextBackHandler}
          disabled={currentPage === steps.length - 1} 
        >
          Next <ArrowRight size={18} />
        </Button>
      )}
    </div>
  );
};

export default FormFooter;
