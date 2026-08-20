import { sitePath } from '@/src/api/subscribe';
import { colors } from '@/src/theme';

const URL = sitePath('/command-center/');

export default function CommandCenterScreen() {
  return (
    <iframe
      src={URL}
      title="Command Center"
      style={{ width: '100%', height: '100%', border: 'none', background: colors.navy }}
    />
  );
}
