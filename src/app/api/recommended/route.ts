import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  ///////////////////////////////////////////
  // in case of using a backend
  // TODO: Book recommendation logic
  const books = await prisma.book.findMany({
    include: {
      author: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });
  const returnable = NextResponse.json(books);

  ///////////////////////////////////////////
  // in case of using a local data
  // const booksCollections: TBookCard[] = Book(4).map((book: TBook) => {
  //   return {
  //     id: book.id,
  //     title: book.title,
  //     author: book.author,
  //     cover: book.cover
  //   };
  // });
  // const returnable = NextResponse.json(booksCollections);

  return returnable;
}
