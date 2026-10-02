import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { sanityClient, sanityImage } from "@/lib/sanity";

const postsQuery = `*[_type == "post" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "authorName": coalesce(authorProfile->name, author->name, author),
  "authorImageUrl": coalesce(authorProfile->image.asset->url, author->image.asset->url),
  "authorImageAlt": coalesce(authorProfile->image.alt, author->image.alt),
  "plain": pt::text(body),
  publishedAt,
  coverImage
}`;

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(value));
}

function readMinutes(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return words ? Math.max(1, Math.ceil(words / 200)) : 0;
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    sanityClient
      .fetch(postsQuery)
      .then((results) => {
        if (isCurrent) setPosts(results);
      })
      .catch(() => {
        if (isCurrent) setHasError(true);
      })
      .finally(() => {
        if (isCurrent) setLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-3xl">
        <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary">
          The Renta Fleet Journal
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl">Notes from the road</h1>
        <p className="mt-5 text-muted-foreground">
          Stories about the vehicles we host, the people who care for them, and the places they take you.
        </p>
      </div>

      {loading ? (
        <p className="mt-12 text-sm text-muted-foreground" role="status">
          Loading articles...
        </p>
      ) : hasError ? (
        <p className="mt-12 text-sm text-muted-foreground" role="status">
          Journal entries are temporarily unavailable. Please check back shortly.
        </p>
      ) : posts.length ? (
        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post._id}>
              <Link to={`/blog/${post.slug}`} className="group block">
                {post.coverImage ? (
                  <img
                    src={sanityImage(post.coverImage).width(900).height(600).fit("crop").url()}
                    alt={post.coverImage.alt || ""}
                    className="aspect-[3/2] w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="flex aspect-[3/2] items-center justify-center rounded-md bg-secondary text-primary">
                    <BookOpen aria-hidden="true" size={42} strokeWidth={1.25} />
                  </div>
                )}
                <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  {readMinutes(post.plain) > 0 && <span aria-hidden="true">·</span>}
                  {readMinutes(post.plain) > 0 && <span>{readMinutes(post.plain)} min read</span>}
                  {post.authorName && <span aria-hidden="true">·</span>}
                  {post.authorName && (
                    <span className="inline-flex items-center gap-2">
                      {post.authorImageUrl && (
                        <img
                          src={post.authorImageUrl}
                          alt={post.authorImageAlt || ""}
                          className="size-6 rounded-full object-cover"
                        />
                      )}
                      {post.authorName}
                    </span>
                  )}
                </div>
                <h2 className="mt-3 text-2xl transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                )}
                <span className="mt-4 inline-flex items-center gap-2 font-heading text-sm uppercase text-primary">
                  Read article <ArrowUpRight aria-hidden="true" size={16} />
                </span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-12 border-y border-border py-14">
          <h2 className="text-xl">The first story is in the works</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Check back for notes from the fleet and the care that goes into every ride.
          </p>
        </div>
      )}
    </section>
  );
}