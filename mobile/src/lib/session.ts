export type DeskSession = {
  id: 'morning' | 'official' | 'probability' | 'overnight';
  title: string;
  blurb: string;
};

function etParts(now: Date): { hour: number; minute: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);
  const hour = Number(parts.find((part) => part.type === 'hour')?.value || 0);
  const minute = Number(parts.find((part) => part.type === 'minute')?.value || 0);
  return { hour: hour === 24 ? 0 : hour, minute };
}

export function etHour(now = new Date()): number {
  return etParts(now).hour;
}

export function deskSession(now = new Date()): DeskSession {
  const { hour, minute } = etParts(now);
  const hm = hour * 60 + minute;
  if (hm >= 8 * 60 + 20 && hm < 9 * 60 + 15) {
    return {
      id: 'official',
      title: 'Official-print window',
      blurb: '08:30 ET. If the print reprices the book, it belongs on the wire — not in a magazine.',
    };
  }
  if (hm >= 13 * 60 + 50 && hm < 14 * 60 + 30) {
    return {
      id: 'official',
      title: 'Official-print window',
      blurb: '14:00 ET. Fed, SEC, a primary. The second screen is this phone.',
    };
  }
  if (hour < 12) {
    return {
      id: 'morning',
      title: 'Morning desk · The Universal Owner',
      blurb: 'Five minutes before the book opens. What you would have to tell the IC that you did not know yesterday.',
    };
  }
  if (hour < 17) {
    return {
      id: 'probability',
      title: 'Afternoon desk · The Probability Desk',
      blurb: 'Base, upside, tail. If the weights moved, that is the afternoon open.',
    };
  }
  return {
    id: 'overnight',
    title: 'After close · overnight book',
    blurb: 'Asia and the official prints that will be on the mast at 07:00. Not a newspaper.',
  };
}
