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
    // Get the author ID from the headers
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

    // Process the file
    const file: File | null = body.get("coverImage") as unknown as File;
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Ensure the file is an image (basic MIME type check)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, error: "Invalid file type, only images are allowed" },
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
        title: bookData.title,
        genre: bookData.genre,
        publishedDate: new Date(), // Automatically set to the current time
        lastUpdated: new Date(),
        data: bookData.data ?? "Info about the book wasn't provided",
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
