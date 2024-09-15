import { books as Book } from "@/data/booksCollection";
import prisma from "@/lib/prisma";
import { TBook, TBookCard } from "@/types/book";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  ///////////////////////////////////////////
  // slug
  const { id } = params;
  if (isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  const data = await prisma.user.findUnique({
    where: { id: Number(id) },
  });
  if (!data) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const returnable = NextResponse.json(data, { status: 200 });

  ///////////////////////////////////////////
  // in case of using a local data
  // const booksCollections: TBookCard[] = Book(4).map((book: TBook) => {
  //   return {
  //     id: book.id,
  //     title: book.title,
  //     author: book.author,
  //     cover: book.cover,
  //   };
  // });
  // const returnable = NextResponse.json(booksCollections);

  return returnable;
}
