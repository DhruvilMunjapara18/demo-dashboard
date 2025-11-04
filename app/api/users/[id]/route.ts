import { NextRequest, NextResponse } from "next/server";
import { deleteUser, updateUser, getUser } from "../../../../lib/controller/userController";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const user = await updateUser(params.id, body);
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    const message =
      error?.code === 11000
        ? "Duplicate key: email or company already exists"
        : error instanceof Error
        ? error.message
        : "An unknown error occurred";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUser(params.id);
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ success: false, message }, { status: 404 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await deleteUser(params.id);
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    const message = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}


