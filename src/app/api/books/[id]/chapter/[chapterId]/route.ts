import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; chapterId: string } },
) {
  try {
    const { id, chapterId } = params;
    const bookId = Number(id);
    const chapterIdNumber = Number(chapterId);
    console.log(id, chapterId);

    if (isNaN(bookId) || isNaN(chapterIdNumber)) {
      return NextResponse.json(
        { error: "Invalid book ID or chapter ID" },
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

    return NextResponse.json(chapter);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
