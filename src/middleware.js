import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/", "/login", "/about", "/contacts"]; // add any other public routes

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // ✅ Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  // ❌ If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const role = payload.role;

    // ✅ Only admin can access adminDashboard
    if (pathname.startsWith("/adminDashboard")) {
      if (role === "admin") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // ✅ Only signed-in users (any role) can access profile
    if (pathname.startsWith("/profile")) {
      return NextResponse.next();
    }

    // ✅ Allow access to other pages if needed
    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:png|jpg|jpeg|gif|svg|webp)$).*)",
  ],
};
