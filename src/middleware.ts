import { env } from "@/env.mjs";
import { type NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  // If in production and not /linktree, redirect to /linktree
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  )
    return NextResponse.next();
  if (env.NODE_ENV === "production" && !pathname.includes("/linktree")) {
    return NextResponse.rewrite("/linktree");
  }
  return NextResponse.next();
}
