import pocketbase from "database";
import eventsource from "eventsource";
import { ClientResponseError } from "pocketbase";
import Cache from "./cache";

// Polyfill EventSource for Node.js
// @ts-ignore
global.EventSource = eventsource;

interface Link {
  url: string;
}

const cache = new Cache<string, Link>(); // slug -> url

pocketbase.collection("links").subscribe("*", (data) => {
  if (data.action === "delete") cache.delete(data.record.slug);
  if (data.action === "update") cache.update(data.record.slug, { url: data.record.url });
});

setInterval(() => cache.banWave(), 1000 * 60 * 60); // 1 hour cache

Bun.serve({
  async fetch(request) {
    const path = new URL(request.url).pathname;

    let link: Link | undefined = cache.get(path);
    if (link) return Response.redirect(link.url, 301);

    try {
      const l = await pocketbase.collection("links").getFirstListItem(pocketbase.filter("slug = {:slug}", { slug: path }));
      if (!l) return new Response("Not found", { status: 404 });

      link = { url: l.url };

      cache.set(path, { url: l.url, stale: false });
    } catch (error) {
      if (!(error instanceof ClientResponseError)) return new Response(error as any, { status: 500 });

      return new Response(error.message, { status: error.status });
    }

    if (!link) return new Response("Not found", { status: 404 });

    return Response.redirect(link.url, 301);
  },
});
