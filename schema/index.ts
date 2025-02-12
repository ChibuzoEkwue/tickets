import { z } from "zod";

export const ticketSchema = z.object({
  ticket_id: z.string().min(1, { message: "Select a ticket" }), // Ensure selection
  number_of_tickets: z.coerce
    .number()
    .gte(1, { message: "Select at least one ticket" }), // Ensures valid number
  avatar: z.string().url({ message: "Upload a valid image URL" }).optional(), // Optional field
  name: z.string().min(1, { message: "Enter your name" }), // Required field
  email: z.string().email({ message: "Enter a valid email address" }), // Email validation
});
