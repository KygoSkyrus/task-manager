import { createFileRoute } from "@tanstack/react-router";
import App from "@/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Serene Tasks — Calm Advanced Task Manager" },
      {
        name: "description",
        content:
          "A calm, fast task manager with filters, drag-and-drop ordering, dark mode and offline local storage.",
      },
      { property: "og:title", content: "Serene Tasks — Calm Advanced Task Manager" },
      {
        property: "og:description",
        content:
          "Add, complete, filter and reorder tasks in a soothing, responsive interface that saves your list locally.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});
