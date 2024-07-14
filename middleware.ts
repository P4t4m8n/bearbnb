import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const token = req.cookies.get("session");
  // console.log("token:", token);
  const { pathname } = req.nextUrl;
  if (pathname === "/profile") {
    // console.log("pathname:", pathname);
  }
  if (pathname === "/login") {
    const returnUrl = req.nextUrl.clone();
    returnUrl.pathname = "/";
    returnUrl.searchParams.set("showDialog", "y");

    return NextResponse.redirect(returnUrl);
  }

  return res;
}
