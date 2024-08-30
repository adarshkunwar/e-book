import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Define the schema for validating the book data
const bookSchema = z.object({
  title: z.string().min(1),
  genre: z.string().min(1),
  data: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const headersList = headers();
  const authorId = headersList.get("id");
  if (!authorId) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  const books = await prisma.book.findMany({
    where: { authorId: Number(authorId) },
  });

  return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
  try {
    const headersList = headers();
    const authorId = headersList.get("id");
    if (!authorId) {
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    const author = await prisma.user.findUnique({
      where: { id: Number(authorId) },
    });

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    // Parse the form data
    const body = await req.formData();
    const formData = {
      title: body.get("title"),
      genre: body.get("genre"),
      data: body.get("data"),
    };

    const bookData = bookSchema.parse({
      ...formData,
      data: formData.data ?? undefined,
    });

    // Create a new book entry with the current time as publishedDate
    const newBook = await prisma.book.create({
      data: {
        title: bookData.title,
        genre: bookData.genre,
        publishedDate: new Date(), // Automatically set to the current time
        lastUpdated: new Date(),
        data: bookData.data ?? "Info about the book wasn't provided",
        author: { connect: { id: Number(authorId) } },
      },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
