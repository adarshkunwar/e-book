import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getRecommendationsForUser } from "./recommendation";
import { TBook } from "@/types/book";

type RecommendedBook = {
  book: {
    id: number;
    title: string;
    genre: string;
    publishedDate: Date; // Keep as Date
    lastUpdated: Date; // Keep as Date
    authorId: number;
    data: string;
    coverImage?: string | null; // Update to allow null
  };
  similarity: number;
};

type PopularBook = {
  book: TBook;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const userId = params.userId;
  console.log(userId);

  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  console.log("Getting recommendations for user ---------------");

  try {
    const recommendedBooks: RecommendedBook[] = await getRecommendationsForUser(
      Number(userId),
    );

    return NextResponse.json(recommendedBooks);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 },
    );
  }
}
