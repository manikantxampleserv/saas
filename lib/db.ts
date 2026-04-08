import { neon } from '@neondatabase/serverless'

// Mock SQL function if DATABASE_URL is missing
const createMockSql = () => {
  return async (strings: TemplateStringsArray, ...values: any[]) => {
    const query = strings.join('?')
    console.warn(`Database query skipped (DATABASE_URL not set): ${query}`)
    
    // Return mock data based on query patterns
    if (query.toLowerCase().includes('count')) {
      return [{ count: 0 }]
    }
    if (query.toLowerCase().includes('sum')) {
      return [{ total: 0 }]
    }
    return []
  }
}

export const sql = (process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== "") 
  ? neon(process.env.DATABASE_URL) 
  : createMockSql() as any

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

export type BlogPost = {
  id: string
  title: string
  description: string
  slug: string
  date: string
  author: string
  category: string
  content: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}
