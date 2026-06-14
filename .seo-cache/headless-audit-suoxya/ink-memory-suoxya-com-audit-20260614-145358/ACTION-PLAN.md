# Action Plan

## Priority Queue

| Severity | Issue |
|----------|-------|
| Critical | Content: Author or expert attribution signals are limited or absent in the visible content. |
| Critical | Content: No external citations were detected in the visible HTML. |
| Critical | Content: The page has limited answer-first formatting such as lists or tables. |
| Critical | Content: The page has weak secondary heading structure. |
| Critical | Content: Word count (5) is below the recommended floor for a homepage (500). |
| Critical | Geo: Author/date attribution is weak in the visible content. |
| Critical | Geo: No llms.txt file was detected. |
| Critical | Geo: No strong 134-167 word self-contained answer block was detected. |
| Critical | Geo: Server-rendered content confirmation is weak without technical-cache support. |
| Critical | Geo: The page has limited question-based heading structure for AI extraction patterns. |

## Recommended Actions

- **Technical**: Publish a root-level robots.txt that clearly references the sitemap.
- **Technical**: Add a self-referencing canonical tag to stabilize indexation signals.
- **Technical**: Add baseline security headers such as CSP, HSTS, X-Frame-Options, and X-Content-Type-Options.
- **Technical**: Serve titles, canonicals, meta directives, structured data, and key copy in server-rendered HTML.
- **Technical**: Consider IndexNow if faster Bing/Yandex discovery matters to the publishing workflow.
- **Performance**: Prioritize the hero/LCP element, reduce render-blocking resources, and compress above-the-fold assets.
- **Performance**: Provide `PAGESPEED_API_KEY` or re-run in an environment with PageSpeed API access for richer CWV evidence.
- **On Page**: Tighten the title tag so it stays in the 50-60 character band where possible.
- **On Page**: Use a single H1 aligned to the page intent.
- **On Page**: Add H2 sections so the content hierarchy is easier to scan.
- **On Page**: Link related pages into the primary commercial and educational paths.
- **Content**: Expand the page with more complete topical coverage, proof points, and supporting detail.
