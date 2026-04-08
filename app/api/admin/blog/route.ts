import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const posts = await sql`
      SELECT * FROM "BlogPost" ORDER BY "createdAt" DESC
    `
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, title, description, slug, date, author, category, content, published } = body

    const result = await sql`
      INSERT INTO "BlogPost" ("id", "title", "description", "slug", "date", "author", "category", "content", "published")
      VALUES (${id}, ${title}, ${description}, ${slug}, ${date}, ${author}, ${category}, ${content}, ${published})
      RETURNING *
    `
    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Failed to create blog post:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}
