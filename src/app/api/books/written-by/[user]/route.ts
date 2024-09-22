import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { z } from "zod";
import path from "path";

// Define the schema for validating the book data
const bookSchema = z.object({
  title: z.string().min(1),
  genre: z.string().min(1),
  data: z.string().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { user: string } },
) {
  const { user } = params;

  if (!user) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  const books = await prisma.book.findMany({
    where: { authorId: Number(user) },
  });

  return NextResponse.json(books);
}
