import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "@/lib/db";

// Single admin credentials (in production, use environment variables)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@saascontrollers.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

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

    // Create JWT token
    const token = jwt.sign(
      {
        email: ADMIN_EMAIL,
        role: "admin",
        type: "admin",
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

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
