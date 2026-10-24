import { useEffect } from "react";

const SITE = "https://dravexhost.xyz";

type Meta = { title: string; description: string };

const PAGES: Record<string, Meta> = {
  "/": {
    title: "DraveX Host: Game Server Hosting Sri Lanka | From LKR 300",
    description:
      "Sri Lankan game server hosting. Fast NVMe Minecraft, Hytale, Rust, FiveM and Node.js servers with DDoS protection and clear LKR pricing.",
  },
  "/games/minecraft": {
    title: "Minecraft Server Hosting Sri Lanka | From LKR 500 | DraveX Host",
    description:
      "Minecraft server hosting in Sri Lanka from LKR 500/month. One-click modpacks and plugins, NVMe storage, DDoS protection and Discord support.",
  },
  "/games/hytale": {
    title: "Hytale Server Hosting | From LKR 2,000 | DraveX Host",
    description:
      "Hytale server hosting on AMD EPYC with NVMe storage and DDoS protection. Plans from LKR 2,000/month, billed in LKR.",
  },
  "/games/rust": {
    title: "Rust Server Hosting Sri Lanka | DraveX Host",
    description:
      "Rust server hosting with low ping for Sri Lanka and South Asia. NVMe storage, DDoS protection and Discord support.",
  },
  "/games/fivem": {
    title: "FiveM Server Hosting Sri Lanka | DraveX Host",
    description:
      "FiveM server hosting with fast NVMe storage, DDoS protection and a team on Discord. Built for roleplay communities.",
  },
  "/games/nodejs": {
    title: "Node.js & Python Hosting | From LKR 300 | DraveX Host",
    description:
      "Host Discord bots, APIs and apps on Node.js or Python from LKR 300/month. NVMe storage, DDoS protection and an easy panel.",
  },
  "/about": {
    title: "About DraveX Host | Sri Lankan Game Server Hosting",
    description:
      "Meet DraveX Host, a Sri Lankan hosting company running game servers on fast hardware with a team you can actually reach.",
  },
  "/terms": {
    title: "Terms of Service | DraveX Host",
    description: "The terms you agree to when using DraveX Host game server hosting.",
  },
  "/refund-policy": {
    title: "Refund Policy | DraveX Host",
    description: "How refunds work at DraveX Host.",
  },
  "/privacy": {
    title: "Privacy Policy | DraveX Host",
    description: "How DraveX Host collects, uses and protects your data.",
  },
};

function setTag(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const meta = (key: "name" | "property", name: string, content: string) =>
  setTag(
    `meta[${key}="${name}"]`,
    () => {
      const m = document.createElement("meta");
      m.setAttribute(key, name);
      return m;
    },
    "content",
    content,
  );

export function useSeo(path: string) {
  useEffect(() => {
    const page = PAGES[path];
    const url = SITE + (path === "/" ? "/" : path);

    document.title = page?.title ?? "DraveX Host";

    if (page) meta("name", "description", page.description);
    meta("name", "robots", page ? "index, follow, max-image-preview:large" : "noindex");
    meta("property", "og:title", page?.title ?? "DraveX Host");
    if (page) meta("property", "og:description", page.description);
    meta("property", "og:url", url);

    setTag(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement("link");
        l.setAttribute("rel", "canonical");
        return l;
      },
      "href",
      url,
    );

    const breadcrumbId = "ld-breadcrumb";
    document.getElementById(breadcrumbId)?.remove();
    if (path !== "/" && page) {
      const s = document.createElement("script");
      s.id = breadcrumbId;
      s.type = "application/ld+json";
      s.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
          {
            "@type": "ListItem",
            position: 2,
            name: page.title.split(" | ")[0].split(":")[0],
            item: url,
          },
        ],
      });
      document.head.appendChild(s);
    }
  }, [path]);
}
