import books from "@/data/booksCollection.json";


export async function GET() {
	return Response.json(books)
}


