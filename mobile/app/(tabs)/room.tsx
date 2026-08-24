import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Screen } from '@/src/components/Ui';
import {
  CHAMBERS,
  DESK_SEED,
  NOTE_MAX,
  SEATS,
  admitMember,
  canMintPeer,
  canPost,
  consumerInbox,
  getMember,
  keepNotes,
  mintPeerCode,
  sanitizeNote,
  seatLabel,
  seatStatus,
  validInvite,
  type Member,
  type RoomNote,
} from '@/src/lib/garden';
import { colors, fonts } from '@/src/theme';

export default function RoomScreen() {
  const [member, setMember] = useState<Member | null>(null);
  const [ready, setReady] = useState(false);
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [role, setRole] = useState('');
  const [why, setWhy] = useState('');
  const [error, setError] = useState('');
  const [chamber, setChamber] = useState<(typeof CHAMBERS)[number]['id']>('book');
  const [notes, setNotes] = useState<RoomNote[]>([]);
  const [draft, setDraft] = useState('');

  const loadNotes = useCallback(async (id: string) => {
    const raw = await AsyncStorage.getItem('uao.room.' + id);
    setNotes(raw ? (JSON.parse(raw) as RoomNote[]) : []);
  }, []);

  useEffect(() => {
    getMember().then((next) => {
      setMember(next);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    loadNotes(chamber);
  }, [chamber, loadNotes]);

  async function enter() {
    if (!validInvite(code)) {
      setError('That code is not on the book.');
      return;
    }
    const next: Member = {
      email: member?.email || '',
      institution: member?.institution || 'Invited seat',
      role: member?.role || 'Member',
      via: code.trim().toUpperCase(),
      at: Date.now(),
      status: 'seated',
      peerCode: member?.peerCode,
    };
    await admitMember(next);
    setMember(next);
    setError('');
  }

  async function apply() {
    if (!email.trim() || !institution.trim() || !role.trim() || !why.trim()) {
      setError('Email, institution, role, and why this desk.');
      return;
    }
    const next: Member = {
      email: email.trim(),
      institution: institution.trim(),
      role: role.trim(),
      why: why.trim(),
      via: 'application',
      at: Date.now(),
      status: 'pending',
    };
    await admitMember(next);
    setMember(next);
    setError('');
  }

  async function post() {
    const text = sanitizeNote(draft);
    if (!text || !canPost(member) || !member) return;
    const next = keepNotes(
      notes.concat([{ who: seatLabel(member), text, at: new Date().toISOString() }]),
    );
    await AsyncStorage.setItem('uao.room.' + chamber, JSON.stringify(next));
    setNotes(next);
    setDraft('');
  }

  async function issuePeer() {
    if (!member || !canMintPeer(member)) return;
    const next = { ...member, peerCode: mintPeerCode() };
    await admitMember(next);
    setMember(next);
  }

  if (!ready) return <Screen><View /></Screen>;

  if (!member) {
    return (
      <Screen>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.folio}>The house · seat review</Text>
          <Text style={styles.kicker}>Walled garden · invite only</Text>
          <Text style={styles.title}>The brief is complimentary. The room is not open.</Text>
          <Text style={styles.lede}>
            You may read the newspaper. You may not speak in the house until the desk has taken
            your seat — or someone already seated has passed you a code. Chatham House Rule
            inside. Sovereigns, pensions, endowments, insurers, family offices.
          </Text>
          <Text style={styles.kicker}>I have an invite</Text>
          <TextInput
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
            placeholder="UAO-DESK"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
          <Pressable onPress={enter} style={styles.primary}>
            <Text style={styles.primaryLabel}>Enter the room</Text>
          </Pressable>
          <Text style={styles.kicker}>Request a seat</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="you@institution.com"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
          {consumerInbox(email) ? (
            <Text style={styles.warn}>Consumer inboxes are reviewed last. A work address sits first.</Text>
          ) : null}
          <TextInput
            value={institution}
            onChangeText={setInstitution}
            placeholder="Institution — CPP, NBIM, family office…"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
          <TextInput
            value={role}
            onChangeText={setRole}
            placeholder="Role — CIO, head of private markets…"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
          <TextInput
            value={why}
            onChangeText={setWhy}
            placeholder="Why this desk — one sentence the IC would recognise."
            placeholderTextColor={colors.muted}
            style={[styles.input, styles.why]}
            multiline
          />
          <Pressable onPress={apply} style={styles.primary}>
            <Text style={styles.primaryLabel}>Submit for desk review</Text>
          </Pressable>
          <Text style={styles.meta}>
            An application does not open the floor. The desk will write. The brief stays complimentary.
          </Text>
          {error ? <Text style={styles.err}>{error}</Text> : null}
        </ScrollView>
      </Screen>
    );
  }

  const active = CHAMBERS.find((item) => item.id === chamber) || CHAMBERS[0];
  const thread = [...(DESK_SEED[chamber] || []), ...notes];
  const seated = canPost(member);
  const pending = seatStatus(member) === 'pending';

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.kicker}>The Room · members only</Text>
        <Text style={styles.title}>Four chambers. One rule.</Text>
        <Text style={styles.rule}>
          Chatham House Rule. Use what is said. Do not name who said it, or their institution,
          outside the garden.
        </Text>
        <Text style={styles.lede}>
          {pending ? 'Application with the desk' : 'Seated'} · {seatLabel(member)}.
        </Text>
        {pending ? (
          <View style={styles.pending}>
            <Text style={styles.kicker}>Under review</Text>
            <Text style={styles.lede}>
              You may read the house spine. You may not post until a seat is confirmed. If you
              already hold a code, enter it below.
            </Text>
            <TextInput
              value={code}
              onChangeText={setCode}
              autoCapitalize="characters"
              placeholder="UAO-DESK"
              placeholderTextColor={colors.muted}
              style={styles.input}
            />
            <Pressable onPress={enter} style={styles.primary}>
              <Text style={styles.primaryLabel}>Apply invite</Text>
            </Pressable>
            {error ? <Text style={styles.err}>{error}</Text> : null}
          </View>
        ) : null}
        <View style={styles.row}>
          {CHAMBERS.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setChamber(item.id)}
              style={[styles.chip, chamber === item.id ? styles.chipOn : null]}>
              <Text style={[styles.chipLabel, chamber === item.id ? styles.chipOnLabel : null]}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.lede}>{active.kicker}</Text>
        {thread.map((item, index) => (
          <View key={`${item.at}-${index}`} style={[styles.bubble, item.desk ? styles.desk : null]}>
            <Text style={styles.who}>{item.who}</Text>
            <Text style={styles.body}>{item.text}</Text>
          </View>
        ))}
        {seated ? (
          <>
            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="A note for the room — no names."
              placeholderTextColor={colors.muted}
              style={[styles.input, styles.why]}
              multiline
              maxLength={NOTE_MAX}
            />
            <Pressable onPress={post} style={styles.primary}>
              <Text style={styles.primaryLabel}>Post to this chamber</Text>
            </Pressable>
            <Text style={styles.meta}>
              Notes stay on this device until the house server exists. They do not reach another seat.
            </Text>
          </>
        ) : null}
        {seated ? (
          <View style={styles.pending}>
            <Text style={styles.kicker}>Invite one peer</Text>
            {member.peerCode ? (
              <Text style={styles.titleSmall}>{member.peerCode}</Text>
            ) : (
              <Pressable onPress={issuePeer} style={styles.primary}>
                <Text style={styles.primaryLabel}>Mint a peer code</Text>
              </Pressable>
            )}
            <Text style={styles.meta}>
              One code. Pass it by hand. The desk can revoke. Not a growth loop.
            </Text>
          </View>
        ) : null}
        <Text style={styles.kicker}>Who sits here</Text>
        {SEATS.map(([title, line]) => (
          <View key={title} style={styles.seat}>
            <View>
              <Text style={styles.seatTitle}>{title}</Text>
              <Text style={styles.lede}>{line}</Text>
            </View>
            <Text style={styles.kicker}>Vetted</Text>
          </View>
        ))}
        <Text style={styles.meta}>The roster is by mandate, not by name. That is the house.</Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 18, paddingBottom: 48, gap: 10 },
  folio: { color: colors.gold2, fontSize: 11, fontWeight: '700', letterSpacing: 1.6, textTransform: 'uppercase' },
  kicker: { color: colors.gold, fontSize: 11, fontWeight: '800', letterSpacing: 1.4, textTransform: 'uppercase' },
  title: { color: colors.text, fontFamily: fonts.serif, fontSize: 28, lineHeight: 34, fontWeight: '700' },
  titleSmall: { color: colors.gold2, fontFamily: fonts.serif, fontSize: 22, fontWeight: '700' },
  lede: { color: colors.muted, fontFamily: fonts.serif, fontSize: 15, lineHeight: 22 },
  meta: { color: colors.muted, fontSize: 12, lineHeight: 18 },
  warn: { color: colors.gold2, fontFamily: fonts.serif, fontSize: 13 },
  rule: {
    color: colors.gold2,
    fontFamily: fonts.serif,
    fontSize: 14,
    lineHeight: 20,
    borderColor: colors.gold,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  pending: {
    borderColor: colors.gold,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    gap: 10,
    backgroundColor: colors.panel,
  },
  input: {
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: colors.text,
    backgroundColor: colors.panel,
  },
  why: { minHeight: 88, textAlignVertical: 'top' },
  primary: { backgroundColor: colors.gold, borderRadius: 8, paddingVertical: 13, alignItems: 'center' },
  primaryLabel: { color: colors.navy, fontWeight: '800' },
  err: { color: colors.danger },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderColor: colors.line, borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  chipOn: { backgroundColor: colors.gold, borderColor: colors.gold },
  chipLabel: { color: colors.text, fontSize: 12, fontWeight: '700' },
  chipOnLabel: { color: colors.navy },
  bubble: {
    backgroundColor: colors.navy2,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  desk: { borderColor: colors.gold },
  who: { color: colors.gold, fontSize: 10, fontWeight: '800', letterSpacing: 1, textTransform: 'uppercase' },
  body: { color: colors.text, fontFamily: fonts.serif, fontSize: 15, lineHeight: 22, marginTop: 6 },
  seat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  seatTitle: { color: colors.text, fontFamily: fonts.serif, fontSize: 16 },
});
