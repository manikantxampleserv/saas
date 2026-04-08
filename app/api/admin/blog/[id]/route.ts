import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const posts = await sql`
      SELECT * FROM "BlogPost" WHERE "id" = ${id}
    `
    if (posts.length === 0) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    return NextResponse.json(posts[0])
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, description, slug, date, author, category, content, published } = body

    const result = await sql`
      UPDATE "BlogPost"
      SET "title" = ${title}, 
          "description" = ${description}, 
          "slug" = ${slug}, 
          "date" = ${date}, 
          "author" = ${author}, 
          "category" = ${category}, 
          "content" = ${content}, 
          "published" = ${published}, 
          "updatedAt" = NOW()
      WHERE "id" = ${id}
      RETURNING *
    `
    if (result.length === 0) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Failed to update blog post:', error)
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await sql`DELETE FROM "BlogPost" WHERE "id" = ${id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete blog post:', error)
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}
