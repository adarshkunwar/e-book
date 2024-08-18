import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// get all users
export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
// login
export async function POST(req: NextRequest) {
  try {
    const newdata = await req.json();

    const existingUser = await prisma.user.findFirst({
      where: {
        email: newdata.email,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        { message: "User with this email does not exist" },
        { status: 404 },
      );
    }

    if (existingUser.password !== newdata.password) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 },
      );
    } else {
      return NextResponse.json(
        { message: "Login successful", data: existingUser },
        { status: 200 },
      );
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error finding user:", error);

    // Return a generic error message
    return NextResponse.json(
      { message: "An error occurred while findnig the user" },
      { status: 500 },
    );
  }
}
