import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  ///////////////////////////////////////////
  // in case of using a backend
  const data = await prisma.user.findMany();
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
