import { books } from "@/data/booksCollection";

const mainData = books(1000);

export async function GET() {
	return Response.json(mainData)
}


