import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const users = await sql`
      SELECT u.*, 
        (SELECT COUNT(*) FROM "Subscription" s WHERE s."userId" = u."id" AND s."status" = 'active') as "activeSubscriptions"
      FROM "User" u
      ORDER BY u."createdAt" DESC
    `
    return NextResponse.json(users)
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, email, name, company, companySize } = body

    const result = await sql`
      INSERT INTO "User" ("id", "email", "name", "company", "companySize")
      VALUES (${id}, ${email}, ${name}, ${company}, ${companySize})
      RETURNING *
    `
    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Failed to create user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
