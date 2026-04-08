import { sql, BlogPost } from "./db";

export type { BlogPost };

export async function getBlogPosts() {
  try {
    const posts = await sql`
      SELECT * FROM "BlogPost" WHERE "published" = true ORDER BY "createdAt" DESC
    `
    return posts as BlogPost[]
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const posts = await sql`
      SELECT * FROM "BlogPost" WHERE "slug" = ${slug} AND "published" = true
    `
    if (posts.length === 0) return null
    return posts[0] as BlogPost
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return null
  }
}

// Keep the static posts as fallback or for initial seeding
export const staticBlogPosts: Omit<BlogPost, 'id' | 'published' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: "How to Streamline Your Business Operations in 2026",
    description: "Discover the latest trends in HRMS, CRMS, and POS systems that are helping businesses scale efficiently.",
    slug: "streamline-business-operations-2026",
    date: "April 1, 2026",
    author: "MKX Team",
    category: "Business Strategy",
    content: "Streamlining your business operations is no longer optional in 2026. With the rapid evolution of SaaS tools like HRMS, CRMS, and POS systems, businesses have more opportunities than ever to automate repetitive tasks and focus on growth...",
  },
  {
    title: "Why Choosing the Right POS System is Crucial for Retail Growth",
    description: "Learn how a modern POS system can transform your retail business, from inventory management to customer loyalty.",
    slug: "right-pos-system-retail-growth",
    date: "March 25, 2026",
    author: "MKX Team",
    category: "Retail Tech",
    content: "In the fast-paced world of retail, every transaction counts. A robust POS system does more than just process payments—it provides deep insights into inventory, customer behavior, and sales performance...",
  },
  {
    title: "The Future of Employee Management with AI-Powered HRMS",
    description: "Explore how artificial intelligence is revolutionizing the way companies manage their workforce and boost productivity.",
    slug: "future-employee-management-ai-hrms",
    date: "March 15, 2026",
    author: "MKX Team",
    category: "HR Tech",
    content: "AI is no longer just a buzzword; it's a practical tool for HR managers. From automated payroll to AI-driven recruitment, the future of HRMS is here, and it's making management more intuitive and data-driven...",
  },
  {
    title: "Maximizing ROI with Integrated CRMS Solutions",
    description: "How a unified view of your customers can drive sales and improve retention.",
    slug: "maximize-roi-crms-solutions",
    date: "March 10, 2026",
    author: "MKX Team",
    category: "Customer Relations",
    content: "Customer Relationship Management Systems (CRMS) are more than just digital rolodexes. In 2026, they are the heartbeat of data-driven marketing and sales...",
  },
];
