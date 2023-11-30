import { env } from "@/env.mjs";
import { type NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // If in production and not /linktree, redirect to /linktree
  if (
    env.NODE_ENV === "production" &&
    !req.nextUrl.pathname.includes("/linktree")
  ) {
    return NextResponse.redirect("/linktree");
  }
  return NextResponse.next();
}
