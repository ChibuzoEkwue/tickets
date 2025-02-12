"use client";
import React from "react";
import { StepsType } from "../steps";
import { useTicketStore } from "@/lib/store";

const FormHeader = ({ steps }: { steps: StepsType[] }) => {
  const { currentPage } = useTicketStore((state) => state);

  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="flex w-full justify-between gap-x-2 md:gap-x-4"
      >
        {steps.map((step, index) => (
          <li key={step.name} className="flex-1">
            <div
              className={`group flex w-full flex-col border-t-4 py-2 text-center transition-colors ${index <= currentPage ? "border-black text-black" : "border-gray-400 text-gray-400"} `}
            >
              <span className="text-sm font-medium">{step.id}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default FormHeader;
