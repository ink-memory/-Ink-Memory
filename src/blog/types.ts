export type BlogInlinePart =
  | string
  | {
      kind: 'code';
      text: string;
    }
  | {
      kind: 'link';
      text: string;
      href: string;
    };

export type BlogInlineContent = string | BlogInlinePart[];

export type BlogContentBlock =
  | {
      type: 'heading';
      text: string;
    }
  | {
      type: 'paragraph';
      content: BlogInlineContent;
    }
  | {
      type: 'image';
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
    }
  | {
      type: 'quote';
      content: BlogInlineContent[];
    };

export type BlogArticle = {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  language: string;
  source: string;
  canonicalHref?: string;
  externalHref?: string;
  originalLinkLabel?: string;
  summary: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  accent: 'yellow' | 'green';
  coverImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  content: BlogContentBlock[];
};
