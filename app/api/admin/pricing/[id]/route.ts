import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, price, interval, features, isPopular, isActive } = body

    const result = await sql`
      UPDATE "PricingPlan"
      SET "name" = ${name}, "price" = ${price}, "interval" = ${interval}, 
          "features" = ${features}, "isPopular" = ${isPopular}, "isActive" = ${isActive}, "updatedAt" = NOW()
      WHERE "id" = ${id}
      RETURNING *
    `
    if (result.length === 0) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Failed to update pricing plan:', error)
    return NextResponse.json({ error: 'Failed to update pricing plan' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await sql`DELETE FROM "PricingPlan" WHERE "id" = ${id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete pricing plan:', error)
    return NextResponse.json({ error: 'Failed to delete pricing plan' }, { status: 500 })
  }
}
