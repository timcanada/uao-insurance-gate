import { WebView } from 'react-native-webview';

import { wrapArticleHtml } from '@/src/lib/html';
import { colors } from '@/src/theme';

export function ArticleHtml({ html, title }: { html: string; title: string }) {
  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: wrapArticleHtml(html, title) }}
      startInLoadingState
      allowsFullscreenVideo
      mediaPlaybackRequiresUserAction={false}
      style={{ flex: 1, backgroundColor: colors.cream, minHeight: 400 }}
    />
  );
}
