import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getRecommendationsForUser } from "./recommendation";
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const user = params.userId;
  console.log(user);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  console.log("Getting recommendations for user ---------------");
  const recommendedBooks = await getRecommendationsForUser(Number(user));
  console.log(recommendedBooks);
  return NextResponse.json(recommendedBooks);
}
