import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const plans = await sql`
      SELECT pp.*, p."name" as "productName"
      FROM "PricingPlan" pp
      JOIN "Product" p ON pp."productId" = p."id"
      ORDER BY p."name", pp."price"
    `
    return NextResponse.json(plans)
  } catch (error) {
    console.error('Failed to fetch pricing plans:', error)
    return NextResponse.json({ error: 'Failed to fetch pricing plans' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, name, price, interval, features, isPopular, productId } = body

    const result = await sql`
      INSERT INTO "PricingPlan" ("id", "name", "price", "interval", "features", "isPopular", "productId")
      VALUES (${id}, ${name}, ${price}, ${interval}, ${features}, ${isPopular}, ${productId})
      RETURNING *
    `
    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Failed to create pricing plan:', error)
    return NextResponse.json({ error: 'Failed to create pricing plan' }, { status: 500 })
  }
}
