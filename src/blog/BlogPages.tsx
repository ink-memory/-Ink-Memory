import {ArrowRight, ExternalLink} from 'lucide-react';

import {blogArticles} from './articles';
import type {BlogArticle, BlogContentBlock, BlogInlineContent} from './types';

function InlineContent({content}: {content: BlogInlineContent}) {
  if (typeof content === 'string') {
    return content;
  }

  return content.map((part, index) => {
    if (typeof part === 'string') {
      return part;
    }

    if (part.kind === 'code') {
      return <code key={`${part.text}-${index}`}>{part.text}</code>;
    }

    return (
      <a href={part.href} key={`${part.href}-${index}`} rel="noreferrer" target="_blank">
        {part.text}
      </a>
    );
  });
}

function renderArticleBlock(block: BlogContentBlock, index: number) {
  const key = `${block.type}-${index}`;

  if (block.type === 'heading') {
    return <h2 key={key}>{block.text}</h2>;
  }

  if (block.type === 'paragraph') {
    return (
      <p key={key}>
        <InlineContent content={block.content} />
      </p>
    );
  }

  if (block.type === 'quote') {
    return (
      <blockquote key={key}>
        {block.content.map((content, index) => (
          <p key={index}>
            <InlineContent content={content} />
          </p>
        ))}
      </blockquote>
    );
  }

  return (
    <figure key={key}>
      <img
        alt={block.alt}
        height={block.height}
        loading={index === 0 ? 'eager' : 'lazy'}
        src={block.src}
        width={block.width}
      />
      {block.caption ? <figcaption>{block.caption}</figcaption> : null}
    </figure>
  );
}

export function BlogPage() {
  return (
    <main className="blog-index-page" id="main">
      <section className="blog-index-list" aria-labelledby="blogTitle">
        <p className="blog-kicker">Ink &amp; Memory Blog</p>
        <h1 id="blogTitle">Articles</h1>

        <div className="blog-list-stack">
          {blogArticles.map((article, index) => (
            <article className="blog-list-item" key={article.slug}>
              <a className={`blog-list-cover blog-list-cover--${article.accent}`} href={`/blog/${article.slug}/`}>
                <img
                  alt=""
                  height={article.coverImage.height}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  src={article.coverImage.src}
                  width={article.coverImage.width}
                />
                <span>{article.source}</span>
              </a>
              <div className="blog-list-copy">
                <a href={`/blog/${article.slug}/`}>
                  <h2>{article.title}</h2>
                </a>
                <p>{article.summary}</p>
                <div className="blog-list-meta">
                  <time dateTime={article.publishedAt}>{article.publishedAt}</time>
                  <span>{article.readTime}</span>
                  <span>{article.language}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export function BlogArticlePage({article}: {article: BlogArticle}) {
  return (
    <main className="blog-detail-page" id="main">
      <article className="blog-detail-article">
        <a className="blog-back-link" href="/blog/">
          <ArrowRight aria-hidden="true" size={17} />
          <span>Back to Blog</span>
        </a>

        <header className="blog-detail-header">
          <p className="blog-kicker">
            {article.source} · {article.language}
          </p>
          <h1>{article.title}</h1>
          {article.subtitle ? <p>{article.subtitle}</p> : null}
          <div className="blog-detail-meta">
            <span>{article.author}</span>
            <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            <span>{article.readTime}</span>
            {article.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </header>

        <div className="blog-detail-body">
          {article.content.map(renderArticleBlock)}
        </div>
      </article>

      <section className="blog-detail-cta" aria-labelledby="blogOriginalTitle">
        <h2 id="blogOriginalTitle">Original publication</h2>
        <p>This page preserves the complete article and images. You can also view it on the original platform.</p>
        <a href={article.externalHref} rel="noreferrer" target="_blank">
          <span>{article.originalLinkLabel}</span>
          <ExternalLink aria-hidden="true" size={17} />
        </a>
      </section>
    </main>
  );
}
