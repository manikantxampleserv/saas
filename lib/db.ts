import { neon } from '@neondatabase/serverless'

export const sql = neon(process.env.DATABASE_URL!)

export type Product = {
  id: string
  name: string
  description: string | null
  icon: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type PricingPlan = {
  id: string
  name: string
  price: number
  interval: string
  features: string[]
  isPopular: boolean
  isActive: boolean
  productId: string
  createdAt: Date
  updatedAt: Date
}

export type User = {
  id: string
  email: string
  name: string | null
  company: string | null
  companySize: string | null
  createdAt: Date
  updatedAt: Date
}

export type Subscription = {
  id: string
  userId: string
  productId: string
  pricingPlanId: string
  status: string
  startDate: Date
  endDate: Date | null
  createdAt: Date
  updatedAt: Date
}

export type SubscriptionWithDetails = Subscription & {
  userName: string | null
  userEmail: string
  productName: string
  planName: string
  planPrice: number
}
