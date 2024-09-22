import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  ///////////////////////////////////////////
  // in case of using a backend
  const headersList = headers();
  const id = headersList.get("id");

  console.log("---------------------------------------");

  if (isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  const author = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: { read: true },
  });

  if (!author) {
    return NextResponse.json({ error: "Author not found" }, { status: 404 });
  }
  console.log(author);
  // return NextResponse.json("hi", { status: 100 });
  return NextResponse.json(author.read, { status: 200 });
  // const { userId } = req.query;
  //
  // if (typeof userId !== 'string') {
  // 	return res.status(400).json({ error: 'Invalid user ID' });
  // }
  // try {
  // 	const lastReadingBook = await prisma.book.findFirst({
  // 		where: {
  // 			// Example: Assuming each user has a `lastReadingBookId` in their User model
  // 			users: {
  // 				some: { id: userId },
  // 			},
  // 		},
  // 		select: {
  // 			id: true,
  // 			title: true,
  // 			currentChapter: true,
  // 			totalChapter: true,
  // 			author: true,
  // 			cover: true,
  // 			description: true,
  // 		},
  // 	});
  //
  // 	if (!lastReadingBook) {
  // 		return res.status(404).json({ error: 'Last reading book not found' });
  // 	}
  //
  // 	return res.status(200).json(lastReadingBook);
  // } catch (error) {
  // 	return res.status(500).json({ error: 'Internal server error' });
  // }
  ///////////////////////////////////////////
  // in case of using a local data
  // const lastReadingBook: TLastReadingBook = Book(1).map((book: TBook) => {
  //   return {
  //     id: book.id,
  //     title: book.title,
  //     currentChapter: book.currentChapter,
  //     totalChapter: book.totalChapter,
  //     author: book.author,
  //     coverImage: book.coverImage,
  //     summary: book.summary,
  //   };
  // })[0];
  // const returable = NextResponse.json(lastReadingBook, { status: 200 });
  // return returable;
}
