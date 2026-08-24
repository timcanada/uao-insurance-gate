import AsyncStorage from '@react-native-async-storage/async-storage';

export const HOUSE_CODES = ['UAO-DESK', 'UAO-BOOK', 'UAO-IC-2026'] as const;

export const PEER_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const PEER_PATTERN = /^UAO-PEER-[ABCDEFGHJKLMNPQRSTUVWXYZ23456789]{4}$/;
export const NOTE_MAX = 400;
export const NOTE_KEEP = 80;

export type SeatStatus = 'seated' | 'pending';

export type Member = {
  email: string;
  institution: string;
  role: string;
  via: string;
  at: number;
  status: SeatStatus;
  why?: string;
  peerCode?: string;
};

export type RoomNote = {
  who: string;
  text: string;
  at: string;
  desk?: boolean;
};

export const CHAMBERS = [
  { id: 'book', title: 'The Book', kicker: 'What the house is holding — not a trade idea.' },
  { id: 'pd', title: 'Probability Desk', kicker: 'Scenario weights. Challenge the house. Do not perform.' },
  { id: 'pm', title: 'Private Markets', kicker: 'Pacing, vintage, and the unquoted sleeve.' },
  { id: 'official', title: 'Official Prints', kicker: 'If it is not a primary, it does not belong here.' },
] as const;

export const DESK_SEED: Record<string, RoomNote[]> = {
  book: [
    {
      who: 'UAO Editorial',
      desk: true,
      at: 'house',
      text: 'Morning book is open. The lead is still liquidity versus contractual access — not the buyback headline. Annotate. Do not attribute outside this room.',
    },
    {
      who: 'UAO Editorial',
      desk: true,
      at: 'house',
      text: 'Chatham House Rule is in force. Use the information. Leave the identity.',
    },
  ],
  pd: [
    {
      who: 'The Probability Desk',
      desk: true,
      at: 'house',
      text: 'BASE remains the governed case. If the 30-year prints through 5.50, the tail is a liability number. Post weights, not takes.',
    },
  ],
  pm: [
    {
      who: 'UAO Editorial',
      desk: true,
      at: 'house',
      text: 'Private credit in DC plans moves exit risk toward members. If an IC just approved that, say what changed in the pack — not the brand.',
    },
  ],
  official: [
    {
      who: 'The Wire',
      desk: true,
      at: 'house',
      text: 'Official prints only. Fed, ECB, SEC, BIS. If it is not a primary, it does not belong in this chamber.',
    },
  ],
};

const MEMBER_KEY = 'uao.member';

export async function getMember(): Promise<Member | null> {
  const raw = await AsyncStorage.getItem(MEMBER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Member;
  } catch {
    return null;
  }
}

export async function admitMember(profile: Member): Promise<void> {
  await AsyncStorage.setItem(MEMBER_KEY, JSON.stringify(profile));
}

export const SEATS = [
  ['Public pension', 'CIO office · Canada'],
  ['Sovereign wealth', 'Head of public markets · Nordics'],
  ['Family office', 'Principal · United States'],
  ['Insurer', 'CIO · Europe'],
  ['Endowment', 'CIO · United Kingdom'],
] as const;

export function normalizeInvite(code: string): string {
  return code.trim().toUpperCase().replace(/\s+/g, '');
}

export function validInvite(code: string): boolean {
  const normalized = normalizeInvite(code);
  return (HOUSE_CODES as readonly string[]).includes(normalized) || PEER_PATTERN.test(normalized);
}

export function mintPeerCode(now = Date.now()): string {
  let n = now % PEER_ALPHABET.length ** 4;
  let out = '';
  for (let i = 0; i < 4; i += 1) {
    out = PEER_ALPHABET[n % PEER_ALPHABET.length] + out;
    n = Math.floor(n / PEER_ALPHABET.length);
  }
  return `UAO-PEER-${out}`;
}

export function seatStatus(member: Member | null | undefined): SeatStatus | null {
  if (!member) return null;
  if (member.status === 'pending' || member.status === 'seated') return member.status;
  return validInvite(member.via || '') ? 'seated' : 'pending';
}

export function canPost(member: Member | null | undefined): boolean {
  return seatStatus(member) === 'seated';
}

export function canMintPeer(member: Member | null | undefined): boolean {
  return canPost(member) && !member?.peerCode;
}

export function seatLabel(member: Pick<Member, 'institution' | 'role'>): string {
  const institution = (member.institution || '').trim() || 'Seat';
  const role = (member.role || '').trim();
  return role ? `${institution} · ${role}` : institution;
}

export function sanitizeNote(text: string): string {
  return text
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, NOTE_MAX);
}

export function consumerInbox(email: string): boolean {
  return /@(gmail|yahoo|hotmail|outlook|icloud|me|aol|proton\.me|live)\./i.test(email);
}

export function keepNotes(notes: RoomNote[]): RoomNote[] {
  return notes.slice(-NOTE_KEEP);
}
