import Link from "next/link";
import { fetchLandingConfig, fetchAllBlogPosts } from "@/lib/api";
import { generateLandingMetadata, fallbackLandingConfig } from "@/lib/landing-data";
import { formatDate } from "@/lib/format";
import type { BlogPost, LandingConfig } from "@/lib/types";

export const revalidate = 60;
export const metadata = generateLandingMetadata();

export default async function BlogListingPage() {
  const [config, postsData] = await Promise.all([
    fetchLandingConfig().catch(() => fallbackLandingConfig),
    fetchAllBlogPosts({ status: "published", limit: 50 }).catch(() => ({
      data: [] as BlogPost[],
      meta: { page: 1, limit: 50, total: 0, totalPages: 1 },
    })),
  ]);

  const posts = postsData.data;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white">Blog</h1>
          <p className="mt-4 text-slate-300">
            {config.brand?.tagline ?? "Latest articles and insights"}
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-slate-300">No blog posts yet. Check back soon!</p>
            <Link
              href="/"
              className="mt-4 inline-block text-sm text-indigo-300 hover:text-indigo-200"
            >
              ← Back to homepage
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:border-white/20 hover:bg-white/10"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="flex flex-col gap-4 md:flex-row md:items-start">
                    {post.coverImageUrl && (
                      <div className="h-48 w-full flex-shrink-0 overflow-hidden rounded-xl md:h-32 md:w-48">
                        <img
                          src={post.coverImageUrl}
                          alt={post.title}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        {post.author && (
                          <>
                            <span>{post.author.name}</span>
                            <span>•</span>
                          </>
                        )}
                        <time dateTime={post.publishedAt ?? post.createdAt}>
                          {formatDate(post.publishedAt ?? post.createdAt)}
                        </time>
                      </div>
                      <h2 className="mt-2 text-2xl font-semibold text-white transition group-hover:text-indigo-300">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-2 text-slate-300 line-clamp-2">{post.excerpt}</p>
                      )}
                      <div className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-300">
                        Read more →
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

