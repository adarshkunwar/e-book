import { books as Book } from "@/data/booksCollection";
import prisma from "@/lib/prisma";
import { TBook, TBookCard } from "@/types/book";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  ///////////////////////////////////////////
  // in case of using a backend 
  // const users = await prisma.book.findMany();
  // const returnable = NextResponse.json(users);

  ///////////////////////////////////////////
  // in case of using a local data
  const booksCollections: TBookCard[] = Book(4).map((book: TBook) => {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      cover: book.cover
    };
  });
  const returnable = NextResponse.json(booksCollections);

  return returnable;
}

