import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const readingHistory = await prisma.readingHistory.findMany();
    return NextResponse.json(readingHistory);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const bookId = Number(body.book);
    const chapterIdNumber = Number(body.chapter);
    const userId = Number(body.user);

    if (isNaN(bookId) || isNaN(chapterIdNumber) || isNaN(userId)) {
      return NextResponse.json(
        { error: "Invalid book ID or chapter ID or User ID" },
        { status: 400 },
      );
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: { chapters: true },
    });
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    const chapter = book.chapters.find(
      (chapter) => chapter.id === chapterIdNumber,
    );

    if (!chapter) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    const data = await prisma.readingHistory.create({
      data: {
        user: { connect: { id: Number(userId) } },
        book: { connect: { id: Number(bookId) } },
        chapter: { connect: { id: Number(chapterIdNumber) } },
      },
    });
    return NextResponse.json({
      data: data,
      message: "Reading history created successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
