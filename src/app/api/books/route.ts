import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  ///////////////////////////////////////////
  // in case of using a backend
  const users = await prisma.book.findMany();
  const returnable = NextResponse.json(users);

  ///////////////////////////////////////////
  // in case of using a local data
  // const returnable = NextResponse.json(books(10));

  return returnable;
}

export async function POST(req: NextRequest) {
  // data structure
  // {
  //   "title": "string",
  //  "authorId": "string"
  // "genre": "string"
  //
  // }
  try {
    const { title, authorId } = await req.json();
    console.log("title", title);
    console.log("authorId", authorId);

    const author = await prisma.user.findUnique({
      where: { id: Number(authorId) },
    });

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    const book = await prisma.book.create({
      data: {
        title,
        author: { connect: { id: authorId } }, // Assuming you're using `connect` to relate existing author
      },
    });
    return NextResponse.json(book);

    return NextResponse.json({ author, message: "Author found" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
