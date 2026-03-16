import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "@/lib/db";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, company, companySize, password } =
      await request.json();

    // Validate input
    if (!firstName || !lastName || !email || !company || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUsers = await sql`
      SELECT id FROM "User" WHERE email = ${email}
    `;

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database
    const result = await sql`
      INSERT INTO "User" (
        id, 
        email, 
        name, 
        company, 
        "companySize", 
        "createdAt", 
        "updatedAt"
      ) VALUES (
        gen_random_uuid(),
        ${email},
        ${firstName + " " + lastName},
        ${company},
        ${companySize},
        NOW(),
        NOW()
      )
      RETURNING id, email, name, company, "companySize", "createdAt"
    `;

    const user = result[0];

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: "user",
        type: "customer",
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        company: user.company,
        companySize: user.companySize,
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
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
