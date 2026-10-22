import ReactMarkdown from "react-markdown";
import { Link } from "@/lib/router-compat";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { formatDate, type Post } from "@/lib/blog";

const BlogPost = ({ post }: { post: Post }) => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-accent">← Voltar ao blog</Link>
          <h1 className="mt-6 text-3xl font-semibold leading-tight md:text-5xl">{post.title}</h1>
          {post.published_at && (
            <time dateTime={post.published_at} className="mt-3 block text-sm text-muted-foreground">
              {formatDate(post.published_at)}
            </time>
          )}
          {post.cover_url && (
            <img src={post.cover_url} alt={post.title} className="mt-8 w-full rounded-3xl object-cover" />
          )}
          <div className="prose-blog mt-8">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
};

export default BlogPost;
