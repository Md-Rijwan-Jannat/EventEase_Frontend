export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "EventEase",
  description:
    "A seamless platform for managing events, registering attendees, and receiving real-time updates.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Events",
      href: "/events",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Create Event",
      href: "/create-event",
    },
    {
      label: "My Events",
      href: "/my-events",
    },
  ],
  links: {
    github: "https://github.com/EventEase",
    twitter: "https://twitter.com/EventEasePlatform",
    docs: "https://docs.eventease.com",
    discord: "https://discord.gg/EventEaseCommunity",
    sponsor: "https://patreon.com/EventEaseSupport",
  },
  socials: {
    facebook: "https://facebook.com/EventEase",
    linkedin: "https://linkedin.com/company/EventEase",
    instagram: "https://instagram.com/EventEase",
    youtube: "https://youtube.com/EventEaseOfficial",
  },
  contact: {
    email: "support@eventease.com",
    phone: "+1-800-123-4567",
  },
  theme: {
    light: "#FFFFFF",
    dark: "#000000",
  },
  url: "https://eventease.com/wp-content/uploads/2023/11/Untitled-1-1.png",
  logo: "/logo.png", // Path to your logo image
};
