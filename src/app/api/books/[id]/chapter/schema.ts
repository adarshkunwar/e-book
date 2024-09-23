import { z } from "zod";

// Define the schema for validating the book data
export const chapter = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});
