import { books } from "@/data/booksCollection";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  ///////////////////////////////////////////
  // in case of using a backend 
  // const users = await prisma.book.findMany();
  // const returnable = NextResponse.json(users);

  ///////////////////////////////////////////
  // in case of using a local data
  const returnable = NextResponse.json(books(10));

  return returnable;
}

