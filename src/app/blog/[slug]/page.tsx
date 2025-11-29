import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchAllBlogPosts, fetchSeoMetadata } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/lib/types";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const metadata = await fetchSeoMetadata(slug).catch(() => ({
    title: "Blog Post",
    description: "",
    url: "",
    type: "article" as const,
    image: undefined,
  }));

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: metadata.url,
      images: metadata.image ? [{ url: metadata.image }] : [],
      type: metadata.type,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: metadata.image ? [metadata.image] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postsData = await fetchAllBlogPosts({ limit: 100 }).catch(() => ({
    data: [] as BlogPost[],
  }));
  const post = postsData.data.find((p) => p.slug === slug && p.status === "published");

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200"
        >
          ← Back to blog
        </Link>

        <header className="mb-8">
          {post.coverImageUrl && (
            <div className="mb-8 aspect-video w-full overflow-hidden rounded-2xl">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex items-center gap-3 text-sm text-slate-400">
            {post.author && (
              <>
                {post.author.avatarUrl && (
                  <img
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span>{post.author.name}</span>
                {post.author.title && <span className="text-slate-500">• {post.author.title}</span>}
                <span>•</span>
              </>
            )}
            <time dateTime={post.publishedAt ?? post.createdAt}>
              {formatDate(post.publishedAt ?? post.createdAt)}
            </time>
          </div>
          <h1 className="mt-4 text-4xl font-bold text-white">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-4 text-xl text-slate-300">{post.excerpt}</p>
          )}
        </header>

        <div
          className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-indigo-300 prose-strong:text-white prose-code:text-indigo-300"
          dangerouslySetInnerHTML={{
            __html: post.content
              ? post.content.replace(/\n/g, "<br />")
              : `<p>${post.excerpt || "Content coming soon..."}</p>`,
          }}
        />

        <footer className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.avatarUrl && (
                    <img
                      src={post.author.avatarUrl}
                      alt={post.author.name}
                      className="h-12 w-12 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-white">{post.author.name}</p>
                    {post.author.title && (
                      <p className="text-sm text-slate-400">{post.author.title}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/blog"
              className="text-sm text-indigo-300 hover:text-indigo-200"
            >
              ← Back to blog
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}

