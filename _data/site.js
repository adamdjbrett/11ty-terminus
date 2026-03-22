const isProduction = process.env.ELEVENTY_ENV === "production";
const productionUrl = process.env.SITE_URL || "https://example.com";

export default {
  title: "Terminus",
  description: "Demo website for the Terminus theme for Zola",
  language: "en",
  author: "Eyal Kalderon",
  url: isProduction ? productionUrl : "http://localhost:8080",
  layout: "center",
  colorScheme: "terminus",
  colorSchemeSwitcher: false,
  copyButton: true,
  katex: false,
  closeResponsiveMenuOnResize: true,
  faviconEmoji: "👨‍💻",
  fediverseCreator: "@ebkalderon@hachyderm.io",
  showDefaultAuthor: false,
  headerTitle: "Terminus",
  homeMaxPosts: 3,
  blogDescription: "Blog section of the Terminus demo website",
  mainMenu: [
    { name: "blog", url: "/blog/" },
    { name: "archive", url: "/archive/" },
    { name: "tags", url: "/tags/" },
    { name: "projects", url: "/projects/" },
    { name: "github", url: "https://github.com/ebkalderon/terminus", newTab: true }
  ],
  socials: [
    { name: "email", url: "mailto:hello@example.com" },
    { name: "github", url: "https://github.com/ebkalderon" },
    { name: "linkedin", url: "https://www.linkedin.com/in/ebkalderon" },
    { name: "mastodon", url: "https://hachyderm.io/@ebkalderon" },
    { name: "keyoxide", url: "https://keyoxide.org/d5ad5bd47835b0f0b0c3046c00ab4c0942dcba25" }
  ],
  copyright: [
    "© <time>$YEAR</time> $AUTHOR",
    "Powered by <a href=\"https://www.11ty.dev\">Eleventy</a>",
    "Theme by <a href=\"https://github.com/ebkalderon/terminus\">ebkalderon</a>"
  ],
  themeName: "terminus",
  themeHomepage: "https://github.com/ebkalderon/terminus",
  themeAuthor: "Eyal Kalderon",
  themeLicense: "MIT",
  themeDemo: "https://ebkalderon.github.io/terminus/"
};
