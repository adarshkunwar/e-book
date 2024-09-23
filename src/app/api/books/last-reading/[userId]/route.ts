import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const returnable = NextResponse.json({
      message: "Not implemented yet!",
      data: [],
    });
    return returnable;
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
