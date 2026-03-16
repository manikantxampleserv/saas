import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [productsCount] = await sql`SELECT COUNT(*) as count FROM "Product" WHERE "isActive" = true`
    const [usersCount] = await sql`SELECT COUNT(*) as count FROM "User"`
    const [activeSubscriptions] = await sql`SELECT COUNT(*) as count FROM "Subscription" WHERE "status" = 'active'`
    const [revenue] = await sql`
      SELECT COALESCE(SUM(pp."price"), 0) as total
      FROM "Subscription" s
      JOIN "PricingPlan" pp ON s."pricingPlanId" = pp."id"
      WHERE s."status" = 'active'
    `

    return NextResponse.json({
      totalProducts: Number(productsCount.count),
      totalUsers: Number(usersCount.count),
      activeSubscriptions: Number(activeSubscriptions.count),
      monthlyRevenue: Number(revenue.total)
    })
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
