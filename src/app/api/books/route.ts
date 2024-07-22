import books from "@/data/booksCollection.json";

export async function GET() {
  return Response.json({
    data: books,
    message: "books found successfully"
  });
}

