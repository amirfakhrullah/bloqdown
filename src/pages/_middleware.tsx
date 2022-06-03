import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import cuid from "cuid";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.cookies["user-token"]) return;

  // Apply cookie if doesn't have
  const token = cuid();
  const res = NextResponse.redirect(req.nextUrl);

  res.cookie("user-token", token, { sameSite: "strict" });

  return res;
}
