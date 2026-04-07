import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

// Single admin credentials (in production, use environment variables)
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@saascontrollers.com").replace(/"/g, "");
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "admin123").replace(/"/g, "");

const JWT_SECRET = (process.env.JWT_SECRET || "MKX").replace(/"/g, "");
const secret = new TextEncoder().encode(JWT_SECRET);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Check if credentials match admin
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Create JWT token using jose for consistency with middleware
    const token = await new SignJWT({
      email: ADMIN_EMAIL,
      role: "admin",
      type: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      user: {
        email: ADMIN_EMAIL,
        role: "admin",
      },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
