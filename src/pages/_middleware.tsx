import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.cookies["user-token"]) return;

  // Apply cookie if doesn't have
  const token = nanoid();
  const res = NextResponse.redirect(req.nextUrl);

  res.cookie("user-token", token, { sameSite: "strict" });

  return res;
}
