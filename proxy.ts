import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = (process.env.JWT_SECRET || "MKX").replace(/"/g, "");

const secret = new TextEncoder().encode(JWT_SECRET);

const protectedPaths = ["/admin"];
const publicPaths = ["/", "/login", "/signup", "/forgot-password"];

/**
 * Proxy function to handle authentication and authorization
 * @param request - The incoming Next.js request
 * @returns NextResponse with appropriate redirect or continuation
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("Proxy - Path:", pathname);
  console.log(
    "Proxy - Cookies:",
    request.cookies.get("auth-token")?.value ? "Token present" : "No token",
  );

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );
  const isPublicPath = publicPaths.some((path) => pathname === path);

  console.log(
    "Proxy - Protected:",
    isProtectedPath,
    "Public:",
    isPublicPath,
  );

  if (isPublicPath) {
    console.log("Proxy - Allowing public path");
    return NextResponse.next();
  }

  if (isProtectedPath) {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      console.log("Proxy - No token, redirecting to login");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(token, secret);
      console.log("Proxy - Token decoded:", payload);

      if (pathname.startsWith("/admin") && payload.role !== "admin") {
        console.log("Proxy - Not admin role, redirecting to login");
        return NextResponse.redirect(new URL("/login", request.url));
      }

      console.log("Proxy - Access granted");
      return NextResponse.next();
    } catch (error) {
      console.log("Proxy - Invalid token, redirecting to login:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  console.log("Proxy - Default allow");
  return NextResponse.next();
}

/**
 * Configuration for the proxy matcher
 * Defines which paths the proxy should run on
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
