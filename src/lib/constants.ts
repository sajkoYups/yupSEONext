export const SEO_DESCRIPTIONS = {
  "Title Tags": {
    title: "Title Tag Analysis",
    description:
      "The HTML element that specifies the title of a web page. It's important for SEO and user experience.",
    improvements: [
      "Keep titles between 50-60 characters",
      "Include primary keyword near the beginning",
      "Make each title unique across your site",
      "Include your brand name",
      "Make it compelling for users to click",
    ],
  },
  "Meta Descriptions": {
    title: "Meta Description Analysis",
    description:
      "A brief summary of a web page's content. It appears in search results and can influence click-through rates.",
    improvements: [
      "Keep descriptions between 150-160 characters",
      "Include target keywords naturally",
      "Write unique descriptions for each page",
      "Include a call-to-action",
      "Make it compelling and relevant to the page content",
    ],
  },
  Headings: {
    title: "Heading Structure Analysis",
    description:
      "HTML tags (H1, H2, etc.) used to define the headings of a page. They help structure content and are important for SEO.",
    improvements: [
      "Use only one H1 tag per page",
      "Follow proper heading hierarchy (H1 → H2 → H3)",
      "Include keywords naturally in headings",
      "Make headings descriptive",
      "Use headings to break up content logically",
    ],
  },
  "Page Load Speed": {
    title: "Page Load Speed Analysis",
    description:
      "The time it takes for your page to load completely. Fast-loading pages provide better user experience and can improve search rankings.",
    improvements: [
      "Optimize image sizes",
      "Minimize HTTP requests",
      "Enable browser caching",
      "Use a CDN",
      "Minify CSS, JavaScript, and HTML",
    ],
  },
  "Internal Page Links": {
    title: "Internal Page Links Analysis",
    description: `Links that point to other pages within your website. They help distribute page authority and create a logical site structure.`,
    improvements: [
      "Use descriptive anchor text",
      "Ensure all links are working",
      "Create a logical linking structure",
      "Link to relevant content",
      "Avoid too many links on one page",
    ],
  },
  "Internal Section Links": {
    title: "Internal Section Links Analysis",
    description: `Links that point to different sections within the same page. They improve navigation and user experience.`,
    improvements: [
      "Use clear and descriptive IDs",
      "Ensure smooth scrolling behavior",
      "Create a logical structure",
      "Add a table of contents for long pages",
      "Use meaningful anchor text",
    ],
  },
  "Duplicate Content": {
    title: "Duplicate Content Analysis",
    description: `Content that appears on multiple URLs within your site. This can confuse search engines and dilute ranking potential.`,
    improvements: [
      "Use canonical tags properly",
      "Implement 301 redirects when needed",
      "Create unique content for each page",
      "Handle URL parameters correctly",
      "Avoid boilerplate content across pages",
    ],
  },
  "Images without Alt": {
    title: "Image Alt Text Analysis",
    description: `Alternative text for images that helps search engines understand the image content and improves accessibility.`,
    improvements: [
      "Add descriptive alt text to all images",
      "Include keywords naturally when relevant",
      "Keep alt text concise but descriptive",
      "Don't stuff keywords",
      'Use empty alt="" for decorative images',
    ],
  },
  "Canonical Tag": {
    title: "Canonical Tag Implementation",
    description: `An HTML element that helps prevent duplicate content by specifying the preferred version of a web page.`,
    improvements: [
      "Use self-referencing canonicals",
      "Implement across all similar pages",
      "Use absolute URLs",
      "Avoid canonical chains",
      "Ensure canonical points to the correct page",
    ],
  },
  "SSL Certificate": {
    title: "SSL Certificate Analysis",
    description: "SSL certificates encrypt data between your website and users, providing security and trust signals to search engines.",
    improvements: [
      "Install an SSL certificate if missing",
      "Ensure certificate is valid and not expired",
      "Redirect all HTTP traffic to HTTPS",
      "Update internal links to use HTTPS",
      "Check for mixed content warnings",
    ],
  },
  "Robots.txt": {
    title: "Robots.txt File Analysis",
    description: "The robots.txt file tells search engine crawlers which pages they can or cannot access on your site.",
    improvements: [
      "Create a robots.txt file at your domain root",
      "Allow important pages to be crawled",
      "Block unnecessary pages (admin, private areas)",
      "Include your XML sitemap location",
      "Test with Google Search Console",
    ],
  },
  "Schema Markup": {
    title: "Schema Markup Implementation",
    description: "Structured data markup helps search engines understand your content better and can enhance search results with rich snippets.",
    improvements: [
      "Add relevant schema types for your content",
      "Implement Organization schema for business info",
      "Add Product schema for e-commerce items",
      "Use Article schema for blog posts",
      "Test with Google's Rich Results Test tool",
    ],
  },
  "Content Length": {
    title: "Content Length Analysis",
    description: "Content length affects SEO rankings. Pages with substantial, valuable content tend to perform better in search results.",
    improvements: [
      "Aim for at least 300 words for most pages",
      "Create comprehensive, in-depth content",
      "Focus on quality over quantity",
      "Break up long content with headings",
      "Include relevant keywords naturally",
    ],
  },
  "Technical SEO": {
    title: "Technical SEO Overview",
    description: "Technical SEO ensures search engines can crawl, index, and understand your website effectively.",
    improvements: [
      "Fix all technical issues identified",
      "Implement proper URL structure",
      "Optimize site speed and performance",
      "Ensure mobile-friendliness",
      "Set up proper redirects",
    ],
  },
};
