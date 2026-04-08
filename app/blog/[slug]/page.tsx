import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getBlogPosts, getBlogPostBySlug, staticBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug) || staticBlogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(post.title)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const dbPosts = await getBlogPosts();
  const posts = dbPosts.length > 0 ? dbPosts : staticBlogPosts;
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug) || staticBlogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 max-w-4xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground mt-6 italic">
              {post.description}
            </p>
          </header>

          <div className="text-lg leading-relaxed text-muted-foreground space-y-8">
            <p>{post.content}</p>
            {/* Additional mock content for layout */}
            <p>
              In today's competitive landscape, businesses need every advantage they can get. 
              The right technology stack isn't just a cost center—it's a growth engine. 
              When you integrate your HR, CRM, and POS systems, you create a unified data layer 
              that provides unparalleled insights into your operations.
            </p>
            <h2 className="text-2xl font-bold text-foreground">Why Integration Matters</h2>
            <p>
              Siloed data is the enemy of efficiency. Imagine your HR system automatically updating your POS payroll 
              based on clock-in data, or your CRM providing customer purchase history directly to your sales team. 
              This level of integration is what separates the industry leaders from the laggards.
            </p>
            <blockquote className="border-l-4 border-accent pl-6 py-2 italic text-foreground">
              "Technology is best when it brings people together and makes processes invisible."
            </blockquote>
            <p>
              At MKX Industries, we focus on making the technology "invisible" by ensuring our tools 
              are intuitive, fast, and deeply integrated. Our mission is to empower you to focus 
              on what matters most: your customers and your employees.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
