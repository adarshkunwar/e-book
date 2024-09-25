import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const books = await prisma.book.findMany({ include: { author: true } });
  const returnable = NextResponse.json(books.filter((book) => book.id > 5));

  return returnable;
}
