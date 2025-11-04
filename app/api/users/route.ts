import { NextRequest, NextResponse } from "next/server";
import { getUsers, createUser } from "../../../lib/controller/userController";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "newest";

    const data = await getUsers({ page, limit, search, sortBy });

    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, phone, email, country, status } = body || {};

    // Validate required fields
    if (!name || !company || !phone || !email || !country) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const user = await createUser({
      name,
      company,
      phone,
      email,
      country,
      status,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Server Error",
      },
      { status: 500 }
    );
  }
}
