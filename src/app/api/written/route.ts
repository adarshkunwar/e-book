import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Define the schema for validating the book data
const bookSchema = z.object({
  title: z.string().min(1),
  genre: z.string().min(1),
  publishedDate: z.string().transform((date) => new Date(date)),
  lastUpdated: z.string().transform((date) => new Date(date)),
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

    const body = await req.json();
    const bookData = bookSchema.parse({
      ...body,
      authorId: Number(authorId), // Add authorId to the book data
    });

    // Create a new book entry
    const newBook = await prisma.book.create({
      data: {
        title: bookData.title,
        genre: bookData.genre,
        publishedDate: bookData.publishedDate,
        lastUpdated: bookData.lastUpdated,
        data: bookData?.data
          ? bookData.data
          : "Info about the book wasnt probvided",
        author: { connect: { id: Number(authorId) } }, // Correctly reference the author
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
