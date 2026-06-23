import { DateTime } from "luxon";
import pluginRss from "@11ty/eleventy-plugin-rss";

const toDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const stripHtml = (value) =>
  String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPassthroughCopy({ "./public/": "/" });

  eleventyConfig.addFilter("readableDate", (value, format = "dd LLL yyyy") => {
    const date = toDate(value);
    if (!date) return "";
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat(format);
  });

  eleventyConfig.addFilter("dotDate", (value) => {
    const date = toDate(value);
    if (!date) return "";
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat("yyyy.MM.dd");
  });

  eleventyConfig.addFilter("htmlDateString", (value) => {
    const date = toDate(value);
    if (!date) return "";
    return DateTime.fromJSDate(date, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("isoDate", (value) => {
    const date = toDate(value) || new Date();
    return DateTime.fromJSDate(date, { zone: "utc" }).toUTC().toISO();
  });

  eleventyConfig.addFilter("currentYear", () => DateTime.now().toFormat("yyyy"));

  eleventyConfig.addFilter("slugify", (value) =>
    String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
  );

  eleventyConfig.addFilter("absoluteUrl", (url, base = "http://localhost:8080") => {
    if (!url) return base;
    return new URL(url, base).toString();
  });

  eleventyConfig.addFilter("wordCount", (value) => {
    const words = stripHtml(value).split(" ").filter(Boolean);
    return words.length;
  });

  eleventyConfig.addFilter("readingMinutes", (words) => {
    const count = Number(words) || 0;
    return Math.max(1, Math.ceil(count / 200));
  });

  eleventyConfig.addFilter("postsWithTag", (posts, tag) => {
    if (!Array.isArray(posts)) return [];
    return posts.filter((item) => Array.isArray(item?.data?.tags) && item.data.tags.includes(tag));
  });
  eleventyConfig.addFilter("postsWithCategory", (posts, category) => {
    if (!Array.isArray(posts)) return [];
    return posts.filter((item) => Array.isArray(item?.data?.categories) && item.data.categories.includes(category));
  });

  eleventyConfig.addFilter("adjacentPosts", (posts, currentUrl) => {
    if (!Array.isArray(posts)) {
      return { newer: null, older: null };
    }
    const index = posts.findIndex((post) => post.url === currentUrl);
    if (index < 0) {
      return { newer: null, older: null };
    }
    return {
      newer: index > 0 ? posts[index - 1] : null,
      older: index < posts.length - 1 ? posts[index + 1] : null
    };
  });

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("content/posts/*.{md,njk,html}")
      .filter((item) => item.data.draft !== true)
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("tagList", (collectionApi) => {
    const tags = new Set();
    for (const item of collectionApi.getFilteredByGlob("content/posts/*.{md,njk,html}")) {
      for (const tag of item.data.tags || []) {
        if (["all", "posts"].includes(tag)) continue;
        tags.add(tag);
      }
    }
    return [...tags].sort((a, b) => a.localeCompare(b));
  });

  eleventyConfig.addCollection("categoryList", (collectionApi) => {
    const categories = new Set();
    for (const item of collectionApi.getFilteredByGlob("content/posts/*.{md,njk,html}")) {
      for (const category of item.data.categories || []) {
        categories.add(category);
      }
    }
    return [...categories].sort((a, b) => a.localeCompare(b));
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
    dir: { input: "content", includes: "../_includes", data: "../_data", output: "_site" }
  };
}
