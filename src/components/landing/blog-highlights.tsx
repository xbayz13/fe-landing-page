import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { BlogPost, LandingConfig } from "@/lib/types";

interface BlogHighlightsProps {
  posts: BlogPost[];
  brand: LandingConfig["brand"];
}

export function BlogHighlights({ posts, brand }: BlogHighlightsProps) {
  if (!posts.length) {
    return null;
  }

  return (
    <section id="blog" className="card-surface p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="pill">Blog</span>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Cerita terbaru dari {brand?.companyName ?? "kami"}
          </h2>
        </div>
        <Link
          href="/blog"
          className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Lihat semua
        </Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition hover:border-indigo-400/60"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-200">
              {formatDate(post.publishedAt ?? post.createdAt)}
            </p>
            <h3 className="text-lg font-semibold text-white">{post.title}</h3>
            <p className="line-clamp-3 text-sm text-slate-300">
              {post.excerpt ?? "Baca cerita lengkapnya di blog kami."}
            </p>
            <div className="mt-auto flex items-center justify-between text-sm text-slate-400">
              <span>{post.author?.name ?? "Editorial Team"}</span>
              <span>→</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

