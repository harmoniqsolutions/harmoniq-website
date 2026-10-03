import { SITE } from "@/lib/site";

export default function sitemap() {
  return [{ url: SITE.url, changeFrequency: "monthly", priority: 1 }];
}
