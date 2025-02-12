"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useTicketStore } from "@/lib/store";

const Checkout = () => {
  const { resetFormData, formData } = useTicketStore((state) => state);

  return (
    <div className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-gray-300">
          <Image
            src={formData.avatar}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            unoptimized
          />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          {formData.name}
        </h2>
        <p className="text-gray-500">{formData.email}</p>
      </div>

      {/* Ticket Details */}
      <div className="mt-6 space-y-3 border-t border-gray-200 pt-4 text-center">
        <p className="text-gray-700">
          <span className="font-medium">Number of Tickets:</span>{" "}
          {formData.number_of_tickets}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Ticket Type:</span>{" "}
          <span className="ml-2 inline-block rounded-full bg-black px-3 py-1 text-sm text-white">
            {formData.ticket_id}
          </span>
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-6 flex justify-center">
        <Button
          variant="default"
          className="w-full"
          onClick={resetFormData}
        >
          Buy Another Ticket
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
