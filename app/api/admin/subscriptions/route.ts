import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const subscriptions = await sql`
      SELECT s.*, 
        u."name" as "userName", u."email" as "userEmail",
        p."name" as "productName",
        pp."name" as "planName", pp."price" as "planPrice"
      FROM "Subscription" s
      JOIN "User" u ON s."userId" = u."id"
      JOIN "Product" p ON s."productId" = p."id"
      JOIN "PricingPlan" pp ON s."pricingPlanId" = pp."id"
      ORDER BY s."createdAt" DESC
    `
    return NextResponse.json(subscriptions)
  } catch (error) {
    console.error('Failed to fetch subscriptions:', error)
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, userId, productId, pricingPlanId, status } = body

    const result = await sql`
      INSERT INTO "Subscription" ("id", "userId", "productId", "pricingPlanId", "status")
      VALUES (${id}, ${userId}, ${productId}, ${pricingPlanId}, ${status || 'active'})
      RETURNING *
    `
    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Failed to create subscription:', error)
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}
