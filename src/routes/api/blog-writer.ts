import { createFileRoute } from "@tanstack/react-router";
import { handle } from "@/server/blog-writer.server";

export const Route = createFileRoute("/api/blog-writer")({
  server: {
    handlers: {
      POST: ({ request }) => handle(request),
    },
  },
});
