import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import prisma from "@/lib/prisma";
import { bookSchema } from "./schema";
import { z } from "zod";
import path from "path";

// Define the schema for validating the book data
export async function GET() {
  const books = await prisma.book.findMany();
  const returnable = NextResponse.json(books);

  return returnable;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const formData = {
      title: body.get("title"),
      genre: body.get("genre"),
      data: body.get("data"),
      authorId: body.get("authorId"),
    };

    const authorId = formData.authorId;
    if (!authorId)
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });

    const author = await prisma.user.findUnique({
      where: { id: Number(authorId) },
    });
    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    const bookData = formData;

    // Process the file

    const file: File | null = body.get("coverImage") as unknown as File;
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a safe file path and name
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    const filePath = path.join(uploadsDir, file.name);

    // Save the file to the public/uploads directory
    await writeFile(filePath, buffer);

    // Create a new book entry with the current time as publishedDate
    const newBook = await prisma.book.create({
      data: {
        title: bookData.title as string,
        genre: bookData.genre as string,
        publishedDate: new Date(), // Automatically set to the current time
        lastUpdated: new Date(),
        data:
          (bookData.data as string) ?? "Info about the book wasn't provided",
        author: { connect: { id: Number(authorId) } },
        coverImage: file.name,
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
