import { z } from "zod";

// Define the schema for validating the book data
export const bookSchema = z.object({
  title: z.string().min(1),
  genre: z.string().min(1),
  data: z.string().optional(),
});
