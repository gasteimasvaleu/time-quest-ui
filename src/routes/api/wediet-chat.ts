import { createFileRoute } from "@tanstack/react-router";
import { handle } from "@/server/wediet-chat.server";

export const Route = createFileRoute("/api/wediet-chat")({
  server: {
    handlers: {
      POST: ({ request }) => handle(request),
    },
  },
});
