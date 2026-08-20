import { wrapArticleHtml } from '@/src/lib/html';
import { colors } from '@/src/theme';

export function ArticleHtml({ html, title }: { html: string; title: string }) {
  return (
    <iframe
      srcDoc={wrapArticleHtml(html, title)}
      title={title}
      style={{
        width: '100%',
        minHeight: 900,
        border: 'none',
        background: colors.cream,
      }}
    />
  );
}
