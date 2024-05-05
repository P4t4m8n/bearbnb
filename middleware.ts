import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  const supabase = createMiddlewareClient({ req, res });

  if (pathname === "/login") {
    const returnUrl = req.nextUrl.clone();
    returnUrl.pathname = "/";
    returnUrl.searchParams.set("showDialog", "y");

    return NextResponse.redirect(returnUrl);
  }
  else if (pathname === "/booking") {
    const returnUrl = req.nextUrl.clone();
    returnUrl.pathname = "/";
    returnUrl.searchParams.set("confirmBooking", "y");

    return NextResponse.redirect(returnUrl);
  }

  await supabase.auth.getSession();

  return res;
}
