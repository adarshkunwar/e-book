import { books } from "@/data/booksCollection";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const users = await prisma.book.findMany();
  return NextResponse.json(users);
}

