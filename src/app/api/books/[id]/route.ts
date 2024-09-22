import { NextResponse, NextRequest } from "next/server";
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
  });
  if (!data) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }
  const returable = NextResponse.json(data, { status: 200 });

  ///////////////////////////////////////////
  // in case of using a local data
  // const selectedBook = Book(100).find((item) => item.id == id);
  // if (!selectedBook) {
  //   return NextResponse.json({ error: "Book not found" }, { status: 404 });
  // }

  // const bookData: TBook = {
  //   id: selectedBook.id,
  //   title: selectedBook.title,
  //   currentChapter: selectedBook.currentChapter,
  //   totalChapter: selectedBook.totalChapter,
  //   author: selectedBook.author,
  //   cover: selectedBook.cover,
  //   summary: selectedBook.summary,
  //   published: selectedBook.published,
  //   genres: selectedBook.genres,
  //   description: selectedBook.description,
  // };

  // const returable = NextResponse.json(bookData, { status: 200 });
  return returable;
}
