import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { chapter } from "./schema";
import { z } from "zod";

// get all users
export async function GET(req: NextRequest) {
  try {
    const chapters = await prisma.chapter.findMany();
    return NextResponse.json(chapters);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const bookId = Number(params.id);
    if (!bookId)
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });

    const body = await req.json();
    // find book and check if it exists.
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });
    if (!book)
      return NextResponse.json({ error: "Book not found" }, { status: 404 });

    // create a new chapter and connect it to the book

    const chapterData = chapter.parse({
      ...body,
      bookId: Number(params.id),
    });

    const newChapter = await prisma.chapter.create({
      data: {
        title: chapterData.title,
        content: chapterData.content,
        book: { connect: { id: bookId } },
      },
    });

    return NextResponse.json(newChapter, { status: 201 });
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
