import { Link } from "@/lib/router-compat";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatDate, type Post } from "@/lib/blog";

const Blog = ({ posts }: { posts: Post[] }) => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-light md:text-5xl">
              Blog <span className="font-serif italic text-accent">Sexando</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Artigos sobre o estilo de vida liberal, relacionamentos, segurança e privacidade.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="mt-12 text-center text-muted-foreground">Nenhum artigo publicado ainda.</p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  className="group overflow-hidden rounded-3xl border border-border bg-card shadow-xs transition-shadow hover:shadow-lg"
                >
                  {p.cover_url && (
                    <img src={p.cover_url} alt={p.title} loading="lazy" className="aspect-video w-full object-cover" />
                  )}
                  <div className="p-6">
                    <p className="text-xs text-muted-foreground">{formatDate(p.published_at)}</p>
                    <h2 className="mt-2 text-xl font-semibold group-hover:text-accent">{p.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Blog;
