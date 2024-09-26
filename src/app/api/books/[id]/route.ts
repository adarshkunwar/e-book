import { NextResponse, NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  ///////////////////////////////////////////
  // slug
  const { id } = params;
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
  }

  const data = await prisma.book.findUnique({
    where: { id: Number(id) },
    include: { author: true, chapters: true },
  });
  if (!data) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }
  const returable = NextResponse.json(data, { status: 200 });

  return returable;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  // Check if the ID is a valid number
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
  }

  const body = await req.formData();
  const formData = {
    title: body.get("title"),
    genre: body.get("genre"),
    data: body.get("data"),
    authorId: body.get("authorId"),
  };

  // Find the book by ID
  const book = await prisma.book.findUnique({
    where: { id: Number(id) },
  });
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

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

  // Update the book with the new data
  const updatedBook = await prisma.book.update({
    where: { id: Number(id) },
    data: {
      title: formData.title as string,
      genre: formData.genre as string,
      publishedDate: new Date(), // Automatically set to the current time
      lastUpdated: new Date(),
      data: (formData.data as string) ?? "Info about the book wasn't provided",
      author: { connect: { id: Number(formData.authorId) } }, // Use the correct authorId from the form data
      coverImage: file.name,
    },
  });

  return NextResponse.json(updatedBook, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    if (isNaN(Number(id))) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }

    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    const deletedBook = await prisma.book.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedBook, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Some Error Occured while deleting the book" },
      { status: 404 },
    );
  }
}
