import {useEffect, useMemo, useRef, useState} from 'react';
import type {RefObject} from 'react';
import {ArrowRight, Check, Copy, ExternalLink} from 'lucide-react';

import {blogArticles} from './articles';
import type {BlogArticle, BlogContentBlock, BlogInlineContent} from './types';

const blogFilters = ['All', 'Agents', 'Workbench', 'State', 'Writing'] as const;
type BlogFilter = (typeof blogFilters)[number];

const filterLabels: Record<BlogFilter, string> = {
  All: '全部',
  Agents: '多智能体',
  Workbench: '工作台',
  State: '状态',
  Writing: '写作',
};

function articleFilters(article: BlogArticle): BlogFilter[] {
  const text = `${article.title} ${article.summary} ${article.tags.join(' ')}`.toLowerCase();
  const filters: BlogFilter[] = ['All'];
  if (/agent|智能体|connector|连接器/.test(text)) filters.push('Agents');
  if (/workspace|工作空间|交互/.test(text)) filters.push('Workbench');
  if (/state|状态|attention|注意力|trust|信任|边界/.test(text)) filters.push('State');
  if (/writing|writer|写作|写作者/.test(text)) filters.push('Writing');
  return filters;
}

function InlineContent({content}: {content: BlogInlineContent}) {
  if (typeof content === 'string') return content;

  return content.map((part, index) => {
    if (typeof part === 'string') return part;
    if (part.kind === 'code') return <code key={`${part.text}-${index}`}>{part.text}</code>;
    return (
      <a href={part.href} key={`${part.href}-${index}`} rel="noreferrer" target="_blank">
        {part.text}
      </a>
    );
  });
}

function ConceptFigure({label, index}: {label: string; index: number}) {
  const text = label.toLowerCase();
  const nodes =
    /connector|连接器|resource|资源/.test(text) ? ['资源', '状态', '权限', '动作']
    : /editor|workspace|工作空间|文档/.test(text) ? ['文档', '上下文', 'Agent', 'Deck']
    : ['输入', '目标', '路径', 'Deck'];

  return (
    <div className="blog-concept-diagram" role="img" aria-label={label}>
      <div className="blog-concept-toolbar"><strong>Ink &amp; Memory</strong><span>{String(index + 1).padStart(2, '0')}</span></div>
      <div className="blog-concept-canvas">
        <span className="blog-concept-label">Concept / Flow</span>
        <div className="blog-concept-path">
          {nodes.map((node, nodeIndex) => (
            <span className={nodeIndex === nodes.length - 1 ? 'is-result' : ''} key={node}>
              <i>{String(nodeIndex + 1).padStart(2, '0')}</i><strong>{node}</strong>
              {nodeIndex < nodes.length - 1 ? <ArrowRight aria-hidden="true" size={17} /> : null}
            </span>
          ))}
        </div>
        <small>Context · Route · State</small>
      </div>
    </div>
  );
}

function renderArticleBlock(block: BlogContentBlock, index: number) {
  const key = `${block.type}-${index}`;

  if (block.type === 'heading') {
    return <h2 id={`article-section-${index}`} key={key}>{block.text}</h2>;
  }

  if (block.type === 'paragraph') {
    return <p key={key}><InlineContent content={block.content} /></p>;
  }

  if (block.type === 'quote') {
    return (
      <blockquote key={key}>
        {block.content.map((content, quoteIndex) => (
          <p key={quoteIndex}><InlineContent content={content} /></p>
        ))}
      </blockquote>
    );
  }

  return (
    <figure className="blog-content-figure" key={key}>
      <ConceptFigure index={index} label={block.alt} />
      <figcaption>{block.caption ?? block.alt}</figcaption>
    </figure>
  );
}

function ArticleTags({article}: {article: BlogArticle}) {
  return (
    <div className="blog-tags" aria-label="Tags">
      {article.tags.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}
    </div>
  );
}

function useBlogReveal(rootRef: RefObject<HTMLElement | null>, dependency: string) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = [...root.querySelectorAll('.blog-reveal')] as HTMLElement[];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, {rootMargin: '0px 0px -9% 0px', threshold: 0.08});
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [dependency, rootRef]);
}

export function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<BlogFilter>('All');
  const pageRef = useRef<HTMLElement>(null);
  const featured = blogArticles.slice(0, 3);
  const filteredArticles = useMemo(
    () => blogArticles.filter((article) => articleFilters(article).includes(activeFilter)),
    [activeFilter],
  );
  const counts = useMemo(() => Object.fromEntries(
    blogFilters.map((filter) => [filter, blogArticles.filter((article) => articleFilters(article).includes(filter)).length]),
  ) as Record<BlogFilter, number>, []);

  useBlogReveal(pageRef, activeFilter);

  return (
    <main className="blog-index-page" id="main" ref={pageRef}>
      <header className="blog-index-hero">
        <p className="blog-kicker">Ink &amp; Memory</p>
        <h1 id="blogTitle">Blog</h1>
        <p>Decks · Agents · Workbench</p>
      </header>

      <section className="blog-featured" aria-labelledby="featuredTitle">
        <div className="blog-section-heading">
          <h2 id="featuredTitle">精选</h2>
          <span>Featured / {String(featured.length).padStart(2, '0')}</span>
        </div>
        <div className="blog-featured-grid">
          {featured.map((article, index) => (
            <article className={`blog-featured-card blog-featured-card--${article.accent} blog-reveal`} key={article.slug}>
              <a href={`/blog/${article.slug}/`}>
                <div className="blog-card-index"><span>{String(index + 1).padStart(2, '0')}</span><time dateTime={article.publishedAt}>{article.publishedAt}</time></div>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <div className="blog-card-footer">
                  <span>{article.author}</span>
                  <ArticleTags article={article} />
                </div>
                <ArrowRight aria-hidden="true" className="blog-card-arrow" size={19} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="blog-library" aria-labelledby="libraryTitle">
        <div className="blog-library-main">
          <div className="blog-library-heading">
            <div><p className="blog-kicker">Index</p><h2 id="libraryTitle">文章</h2></div>
            <span aria-live="polite">{String(filteredArticles.length).padStart(2, '0')}</span>
          </div>
          <div className="blog-list-stack" key={activeFilter}>
            {filteredArticles.map((article) => (
              <article className={`blog-list-item blog-list-item--${article.accent} blog-reveal`} key={article.slug}>
                <a href={`/blog/${article.slug}/`}>
                  <span className="blog-row-signal" aria-hidden="true" />
                  <div className="blog-list-copy">
                    <h3>{article.title}</h3>
                    <p>{article.summary}</p>
                  </div>
                  <div className="blog-list-meta">
                    <time dateTime={article.publishedAt}>{article.publishedAt}</time>
                    <span>{article.author}</span>
                    <ArticleTags article={article} />
                  </div>
                  <ArrowRight aria-hidden="true" className="blog-row-arrow" size={18} />
                </a>
              </article>
            ))}
          </div>
        </div>

        <aside className="blog-filter-rail" aria-label="文章分类">
          <p>Topics</p>
          <div role="group" aria-label="筛选文章">
            {blogFilters.map((filter) => (
              <button
                aria-pressed={activeFilter === filter}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                <span>{filterLabels[filter]}</span><small>{String(counts[filter]).padStart(2, '0')}</small>
              </button>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}

export function BlogArticlePage({article}: {article: BlogArticle}) {
  const [activeHeading, setActiveHeading] = useState(0);
  const [copied, setCopied] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  const isEnglish = article.language === 'English';
  const headings = useMemo(() => article.content
    .map((block, index) => block.type === 'heading' ? {index, text: block.text} : null)
    .filter((heading): heading is {index: number; text: string} => Boolean(heading)), [article.content]);
  const content = article.content
    .map((block, index) => ({block, index}))
    .filter(({block, index}) => !(index === 0 && block.type === 'image' && block.src === article.coverImage.src));

  useBlogReveal(pageRef, article.slug);

  useEffect(() => {
    let animationFrame = 0;
    const updateReadingState = () => {
      const page = pageRef.current;
      if (!page) return;
      const articleTop = window.scrollY + page.getBoundingClientRect().top;
      const scrollable = Math.max(1, page.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, (window.scrollY - articleTop) / scrollable));
      page.style.setProperty('--article-progress', `${progress * 100}%`);

      let nextHeading = 0;
      headings.forEach((heading, headingIndex) => {
        const element = document.getElementById(`article-section-${heading.index}`);
        if (element && element.getBoundingClientRect().top <= 172) nextHeading = headingIndex;
      });
      setActiveHeading((current) => current === nextHeading ? current : nextHeading);
      animationFrame = 0;
    };
    const requestUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateReadingState);
    };
    updateReadingState();
    window.addEventListener('scroll', requestUpdate, {passive: true});
    window.addEventListener('resize', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [headings]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="blog-detail-page" id="main" ref={pageRef}>
      <span className="blog-reading-progress" aria-hidden="true" />
      <article className="blog-detail-article">
        <a className="blog-back-link" href="/blog/">
          <ArrowRight aria-hidden="true" size={17} />
          <span>{isEnglish ? 'Back to Blog' : '返回 Blog'}</span>
        </a>

        <header className="blog-detail-header blog-reveal">
          <p className="blog-kicker">Blog / {article.source}</p>
          <h1>{article.title}</h1>
          {article.subtitle ? <p>{article.subtitle}</p> : null}
          <div className="blog-detail-meta">
            <span>{article.author}</span>
            <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            <span>{article.readTime}</span>
            <ArticleTags article={article} />
          </div>
        </header>

        <div className="blog-article-layout">
          <div className="blog-article-column">
            <figure className="blog-detail-cover blog-reveal">
              <ConceptFigure index={0} label={article.coverImage.alt} />
            </figure>
            <div className="blog-detail-body">
              {content.map(({block, index}) => renderArticleBlock(block, index))}
            </div>
          </div>

          <aside className="blog-article-sidecar blog-reveal" aria-label={isEnglish ? 'Article navigation' : '文章导航'}>
            <section>
              <div className="blog-sidecar-label"><span>{isEnglish ? 'Contents' : '目录'}</span><time dateTime={article.publishedAt}>{article.publishedAt}</time></div>
              <ol>
                {headings.map((heading, index) => (
                  <li className={activeHeading === index ? 'is-active' : ''} key={heading.index}>
                    <a href={`#article-section-${heading.index}`}>{heading.text}</a>
                  </li>
                ))}
              </ol>
            </section>
            <section className="blog-sidecar-author">
              <span>{isEnglish ? 'Author' : '作者'}</span>
              <strong>{article.author}</strong>
            </section>
            <section className="blog-sidecar-share">
              <span>{isEnglish ? 'Share' : '分享'}</span>
              <button onClick={copyLink} type="button">
                {copied ? <Check aria-hidden="true" size={15} /> : <Copy aria-hidden="true" size={15} />}
                {copied ? (isEnglish ? 'Copied' : '已复制') : (isEnglish ? 'Copy link' : '复制链接')}
              </button>
            </section>
          </aside>
        </div>
      </article>

      {article.externalHref && article.originalLinkLabel ?
        <section className="blog-detail-cta" aria-labelledby="blogOriginalTitle">
          <p className="blog-kicker">Source</p>
          <h2 id="blogOriginalTitle">{isEnglish ? 'Original' : '原文'}</h2>
          <a href={article.externalHref} rel="noreferrer" target="_blank">
            <span>{article.originalLinkLabel}</span><ExternalLink aria-hidden="true" size={17} />
          </a>
        </section>
      : null}
    </main>
  );
}
