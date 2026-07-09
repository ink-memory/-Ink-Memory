import {mkdir, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';

import {blogArticles} from '../src/blog/articles';
import type {BlogArticle, BlogContentBlock, BlogInlineContent} from '../src/blog/types';

const siteUrl = 'https://suoxya.com';
const outputRoot = resolve(process.cwd(), 'blog');

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderInline(content: BlogInlineContent) {
  if (typeof content === 'string') {
    return escapeHtml(content);
  }

  return content
    .map((part) => {
      if (typeof part === 'string') {
        return escapeHtml(part);
      }

      if (part.kind === 'code') {
        return `<code>${escapeHtml(part.text)}</code>`;
      }

      return `<a href="${escapeHtml(part.href)}">${escapeHtml(part.text)}</a>`;
    })
    .join('');
}

function renderBlock(block: BlogContentBlock) {
  if (block.type === 'heading') {
    return `<h2>${escapeHtml(block.text)}</h2>`;
  }

  if (block.type === 'paragraph') {
    return `<p>${renderInline(block.content)}</p>`;
  }

  if (block.type === 'quote') {
    return `<blockquote>${block.content.map((content) => `<p>${renderInline(content)}</p>`).join('')}</blockquote>`;
  }

  const caption = block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : '';
  return `<figure><img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt)}" width="${block.width}" height="${block.height}" loading="lazy" />${caption}</figure>`;
}

function shell({head, body, lang}: {head: string; body: string; lang: string}) {
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#F5E9D6" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <meta name="application-name" content="Ink &amp; Memory" />
${head}
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='32' fill='%23FFD42A'/%3E%3Ctext x='32' y='39' text-anchor='middle' font-size='20' font-family='Arial,sans-serif' font-weight='900' fill='%23111111'%3EI%26M%3C/text%3E%3C/svg%3E" />
    <script>document.documentElement.classList.add('js-enabled');</script>
    <style>.js-enabled #root > .seo-static-content { display: none; }</style>
  </head>
  <body>
    <div id="root">
${body}
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
}

function articleHead(article: BlogArticle) {
  const canonical = `${siteUrl}/blog/${article.slug}/`;
  const image = `${siteUrl}${article.coverImage.src}`;
  const language = article.language === 'English' ? 'en' : 'zh-CN';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonical}#article`,
    headline: article.title,
    description: article.summary,
    image,
    url: canonical,
    datePublished: article.publishedAt,
    dateModified: '2026-07-10',
    inLanguage: language,
    author: {'@type': 'Person', name: article.author},
    isPartOf: {'@type': 'Blog', name: 'Ink & Memory Blog', url: `${siteUrl}/blog/`},
    publisher: {'@type': 'Organization', name: 'Ink & Memory', url: `${siteUrl}/`},
    sameAs: article.externalHref,
  };

  return `    <meta name="author" content="${escapeHtml(article.author)}" />
    <meta name="description" content="${escapeHtml(article.summary)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${escapeHtml(article.title)} | Ink &amp; Memory Blog" />
    <meta property="og:description" content="${escapeHtml(article.summary)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="Ink &amp; Memory" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(article.title)} | Ink &amp; Memory Blog" />
    <meta name="twitter:description" content="${escapeHtml(article.summary)}" />
    <meta name="twitter:image" content="${image}" />
    <script type="application/ld+json">${JSON.stringify(schema)}</script>
    <title>${escapeHtml(article.title)} | Ink &amp; Memory Blog</title>`;
}

function articleBody(article: BlogArticle) {
  const subtitle = article.subtitle ? `<p>${escapeHtml(article.subtitle)}</p>` : '';
  const blocks = article.content.map(renderBlock).join('\n          ');

  return `      <main class="seo-static-content" aria-label="Ink &amp; Memory article">
        <article>
          <p><a href="${siteUrl}/blog/">Back to Blog</a></p>
          <header>
            <p>${escapeHtml(article.source)} · ${escapeHtml(article.language)}</p>
            <h1>${escapeHtml(article.title)}</h1>
            ${subtitle}
            <p>${escapeHtml(article.author)} · <time datetime="${article.publishedAt}">${article.publishedAt}</time> · ${escapeHtml(article.readTime)}</p>
          </header>
          ${blocks}
          <p><a href="${escapeHtml(article.externalHref)}">${escapeHtml(article.originalLinkLabel)}</a></p>
        </article>
      </main>`;
}

function blogIndexPage() {
  const canonical = `${siteUrl}/blog/`;
  const description = 'Ink & Memory Blog 收录 AI 写作、长期记忆、Workspace 状态管理和交互设计文章。';
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: blogArticles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/blog/${article.slug}/`,
      name: article.title,
    })),
  };
  const head = `    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="Ink &amp; Memory Blog | AI 写作记忆与工作空间设计" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="Ink &amp; Memory" />
    <meta property="og:image" content="${siteUrl}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Ink &amp; Memory Blog | AI 写作记忆与工作空间设计" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${siteUrl}/og-image.png" />
    <script type="application/ld+json">${JSON.stringify(itemList)}</script>
    <title>Ink &amp; Memory Blog | AI 写作记忆与工作空间设计</title>`;
  const articles = blogArticles
    .map(
      (article) => `          <article>
            <a href="/blog/${article.slug}/"><img src="${article.coverImage.src}" alt="" width="${article.coverImage.width}" height="${article.coverImage.height}" /></a>
            <h2><a href="/blog/${article.slug}/">${escapeHtml(article.title)}</a></h2>
            <p>${escapeHtml(article.summary)}</p>
            <p><time datetime="${article.publishedAt}">${article.publishedAt}</time> · ${escapeHtml(article.readTime)} · ${escapeHtml(article.language)}</p>
          </article>`,
    )
    .join('\n');
  const body = `      <main class="seo-static-content" aria-label="Ink & Memory Blog">
        <h1>Articles</h1>
${articles}
      </main>`;

  return shell({head, body, lang: 'zh-CN'});
}

async function writePage(path: string, content: string) {
  await mkdir(dirname(path), {recursive: true});
  await writeFile(path, content, 'utf8');
}

await writePage(resolve(outputRoot, 'index.html'), blogIndexPage());

for (const article of blogArticles) {
  const lang = article.language === 'English' ? 'en' : 'zh-CN';
  const page = shell({head: articleHead(article), body: articleBody(article), lang});
  await writePage(resolve(outputRoot, article.slug, 'index.html'), page);
}

console.log(`Generated ${blogArticles.length + 1} blog pages.`);
