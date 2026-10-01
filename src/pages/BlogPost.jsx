import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { sanityClient, sanityImage } from "@/lib/sanity";

const postQuery = `*[_type == "post" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0] {
  title,
  excerpt,
  author,
  publishedAt,
  coverImage,
  body
}`;

const portableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 text-2xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-xl">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-primary pl-5 text-lg text-muted-foreground">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="my-5 leading-8 text-foreground/90">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="my-5 list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="my-5 list-decimal space-y-2 pl-6">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noreferrer"
        className="text-primary underline underline-offset-4"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <img
          src={sanityImage(value).width(1200).url()}
          alt={value.alt || ""}
          className="w-full rounded-md object-cover"
        />
        {value.caption && (
          <figcaption className="mt-2 text-sm text-muted-foreground">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
};

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date(value));
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    sanityClient
      .fetch(postQuery, { slug })
      .then((result) => {
        if (isCurrent) setPost(result);
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
  }, [slug]);

  if (loading) {
    return <p className="mx-auto max-w-3xl px-6 py-20 text-sm text-muted-foreground" role="status">Loading article...</p>;
  }

  if (hasError || !post) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-3xl">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft aria-hidden="true" size={16} /> Back to the Journal
        </Link>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link to="/blog" className="inline-flex items-center gap-2 font-heading text-sm uppercase text-primary hover:underline">
        <ArrowLeft aria-hidden="true" size={16} /> The Journal
      </Link>
      <header className="mx-auto max-w-3xl py-10">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.author && <span aria-hidden="true">·</span>}
          {post.author && <span>{post.author}</span>}
        </div>
        <h1 className="mt-4 text-4xl leading-tight md:text-5xl">{post.title}</h1>
        {post.excerpt && <p className="mt-5 text-lg text-muted-foreground">{post.excerpt}</p>}
      </header>
      {post.coverImage && (
        <img
          src={sanityImage(post.coverImage).width(1600).height(900).fit("crop").url()}
          alt={post.coverImage.alt || ""}
          className="aspect-video w-full rounded-md object-cover"
        />
      )}
      <div className="mx-auto mt-10 max-w-3xl">
        <PortableText value={post.body || []} components={portableTextComponents} />
      </div>
    </article>
  );
}