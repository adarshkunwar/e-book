import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// get all users
export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  try {
    const newdata = await req.json();

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        email: newdata.email,
        firstName: newdata.firstName,
        lastName: newdata.lastName,
        password: newdata.password,
      },
    });

    return NextResponse.json({
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating user:", error);

    // Return a generic error message
    return NextResponse.json(
      { message: "An error occurred while creating the user" },
      { status: 500 },
    );
  }
}
