// Public website identity and navigation. Keep private configuration in server environment variables.
export const SITE = {
  name: "HarmoniQ Solutions",
  url: "https://www.harmoniqsolutions.com",
  email: "sales@harmoniqsolutions.com",
  phone: "+1 551-223-1520",
  phoneHref: "tel:+15512231520",
  title: "HarmoniQ Solutions | AV, IT & Security Installations",
  description: "A small, hands-on team installing audio, video, Wi-Fi, IT, and security systems for homes, churches, and small businesses. Smaller projects welcome.",
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Our team", href: "#about" },
  { label: "Who we help", href: "#industries" },
  { label: "How it works", href: "#why-us" },
];

export const PROJECT_TYPES = {
  mixed: "A mix of services / I’m not sure yet",
  av: "Audio & video",
  it: "IT, networks & Wi-Fi",
  security: "Security cameras & systems",
};
