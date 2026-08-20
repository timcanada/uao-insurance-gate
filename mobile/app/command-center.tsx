import { WebView } from 'react-native-webview';

import { sitePath } from '@/src/api/subscribe';
import { colors } from '@/src/theme';

export default function CommandCenterScreen() {
  return (
    <WebView
      source={{ uri: sitePath('/command-center/') }}
      style={{ flex: 1, backgroundColor: colors.navy }}
    />
  );
}
