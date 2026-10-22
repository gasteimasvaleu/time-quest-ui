import { useEffect, useState } from "react";
import { Link, useParams } from "@/lib/router-compat";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { formatDate, type Post } from "@/lib/blog";

const setMeta = (attr: "name" | "property", key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    supabase
      .from("posts")
      .select("*")
      .eq("slug", slug ?? "")
      .eq("status", "published")
      .maybeSingle()
      .then(({ data }) => setPost((data as Post) ?? null));
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    const title = post.meta_title || post.title;
    const desc = post.meta_description || post.excerpt;
    document.title = `${title} | Sexando`;
    setMeta("name", "description", desc);
    setMeta("name", "keywords", post.keywords.join(", "));
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:type", "article");
    if (post.cover_url) setMeta("property", "og:image", post.cover_url);
  }, [post]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-accent">← Voltar ao blog</Link>
          {post === undefined ? (
            <p className="mt-8 text-muted-foreground">Carregando…</p>
          ) : post === null ? (
            <p className="mt-8 text-muted-foreground">Artigo não encontrado.</p>
          ) : (
            <>
              <h1 className="mt-6 text-3xl font-semibold leading-tight md:text-5xl">{post.title}</h1>
              <p className="mt-3 text-sm text-muted-foreground">{formatDate(post.published_at)}</p>
              {post.cover_url && (
                <img src={post.cover_url} alt={post.title} className="mt-8 w-full rounded-3xl object-cover" />
              )}
              <div className="prose-blog mt-8">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
};

export default BlogPost;
