import { colors } from '../theme';

export function wrapArticleHtml(html: string, title: string): string {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    :root { color-scheme: light; }
    html, body { margin: 0; padding: 0; background: ${colors.cream}; }
    body {
      color: ${colors.ink};
      font: 400 17px/1.65 Georgia, "Times New Roman", serif;
      padding: 8px 18px 48px;
    }
    h1, h2, h3 { color: ${colors.navy}; font-weight: 700; line-height: 1.25; }
    h1 { font-size: 28px; margin: 0 0 12px; }
    h2 { font-size: 22px; border-bottom: 2px solid ${colors.gold}; padding-bottom: 8px; margin: 32px 0 14px; }
    h3 { font-size: 18px; }
    a { color: #8A7433; }
    img, video, iframe { max-width: 100%; }
    img { height: auto; border-radius: 4px; }
    iframe { width: 100%; min-height: 220px; border: 0; }
    table { width: 100%; border-collapse: collapse; font-size: 13.5px; margin: 16px 0; }
    th { background: ${colors.navy}; color: ${colors.cream}; text-align: left; padding: 8px; }
    td { padding: 8px; border-bottom: 1px solid #E3DDCE; vertical-align: top; }
    blockquote { margin: 16px 0; padding: 8px 0 8px 14px; border-left: 3px solid ${colors.gold}; color: #3a4a5c; }
    figure { margin: 18px 0; }
    figcaption { color: #6d6556; font-size: 13px; margin-top: 6px; }
  </style>
</head>
<body>${html}</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
