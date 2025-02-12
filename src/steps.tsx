import { JSX } from "react";
import Ticket from "./components/steps/ticket";
import PersonalData from "./components/steps/personal-data";
import Checkout from "./components/steps/checkout";

export type StepsType = {
  id: string;
  name: string;
  status?: string;
  fields: string[]; // Ensures every step has fields
  component: () => JSX.Element;
};

export const steps: StepsType[] = [
  {
    id: "Step 1",
    name: "Ticket Information",
    status: "completed",
    fields: ["ticket_id", "number_of_tickets"], // ✅ Matches schema
    component: Ticket,
  },
  {
    id: "Step 2",
    name: "Personal Details",
    status: "active",
    fields: ["avatar", "email", "name"],
    component: PersonalData,
  },
  { id: "Step 3", name: "Check Out", fields: [], component: Checkout }, // ✅ Ensure `fields` is always defined
];
