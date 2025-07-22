import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  const protectedPaths = ["/dashboard", "/admin"];
  const authPages = ["/signin", "/signup"];

  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  const isAuthPage = authPages.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/signin",
    "/signup",
  ],
};
