import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getBlogPosts, staticBlogPosts } from "@/lib/blog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Blog | Insights on HRMS, CRMS & POS Systems",
  description: "Stay updated with the latest trends and insights in enterprise business solutions and SaaS technology.",
};

export default async function BlogPage() {
  const dbPosts = await getBlogPosts();
  const blogPosts = dbPosts.length > 0 ? dbPosts : staticBlogPosts;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Insights & Resources
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Stay updated with the latest trends, guides, and insights on how to grow your business using enterprise-grade SaaS tools.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:border-accent transition-colors cursor-pointer flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-accent px-2 py-1 bg-accent/10 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="line-clamp-3 text-sm">
                    {post.description}
                  </CardDescription>
                  <div className="mt-4 text-sm font-medium text-accent">Read more →</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
