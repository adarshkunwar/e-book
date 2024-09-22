import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { user: string } },
) {
  const { user } = params;

  if (!user) {
    return NextResponse.json({ error: "No ID provided" }, { status: 400 });
  }

  const books = await prisma.book.findMany({
    where: { authorId: Number(user) },
  });

  return NextResponse.json(books);
}
