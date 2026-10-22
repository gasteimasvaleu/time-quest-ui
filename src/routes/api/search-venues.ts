import { createFileRoute } from "@tanstack/react-router";
import { handle } from "@/server/search-venues.server";

export const Route = createFileRoute("/api/search-venues")({
  server: {
    handlers: {
      POST: ({ request }) => handle(request),
    },
  },
});
