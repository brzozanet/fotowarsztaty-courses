import { NextResponse } from "next/server";

export async function POST() {
  // W przypadku stateless API wylogowanie jest proste
  return NextResponse.json({ success: true });
}
