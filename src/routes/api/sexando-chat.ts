import { createFileRoute } from "@tanstack/react-router";
import { handle } from "@/server/sexando-chat.server";

export const Route = createFileRoute("/api/sexando-chat")({
  server: {
    handlers: {
      POST: ({ request }) => handle(request),
    },
  },
});
