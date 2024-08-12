import { books as Book } from "@/data/booksCollection";
import { TBook, TLastReadingBook } from "@/types/book";
import { NextResponse } from "next/server";
// import prisma from '@/lib/prisma';

export async function GET() {
	///////////////////////////////////////////
	// in case of using a backend
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
	const lastReadingBook: TLastReadingBook = Book(1).map((book: TBook) => {
		return {
			id: book.id,
			title: book.title,
			currentChapter: book.currentChapter,
			totalChapter: book.totalChapter,
			author: book.author,
			cover: book.cover,
			summary: book.summary,
		};
	})[0];

	const returable = NextResponse.json(lastReadingBook, { status: 200 });
	return returable;
}
