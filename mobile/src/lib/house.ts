/** Real house pages only. Do not invent a mandate the desk has not confirmed. */

export const CAREERS = 'https://www.universalassetowners.com/careers/';
export const CAREERS_INTELLIGENCE = 'https://www.universalassetowners.com/careers/intelligence/';
export const BRIEFINGS = 'https://www.universalassetowners.com/briefings/';

export const VERIFIED_ROLES_LIVE = false;

export const VERIFIED_ROLES_COPY =
  'No individually verified roles are live right now. We publish a mandate only once it is confirmed and source-verified. Until then: the houses we track, and the Talent Desk.';

export const TALENT_DESKS = [
  {
    id: 'signals',
    kicker: 'Verified roles',
    title: 'Careers Intelligence',
    blurb:
      'The most consequential seats rarely begin with a public application. CIO moves, mandate shifts, hiring across the boundary — once confirmed and source-verified.',
    href: CAREERS_INTELLIGENCE,
  },
  {
    id: 'candidates',
    kicker: 'Candidates',
    title: 'A discreet next step',
    blurb:
      'Verified opportunities and private career intelligence for people whose careers are not public processes. Work email. Direct line. The Talent Desk writes back.',
    href: 'mailto:info@universalassetowners.com?subject=Talent%20desk%20%E2%80%94%20candidate',
  },
  {
    id: 'employers',
    kicker: 'Employers',
    title: 'Post a mandate',
    blurb:
      'Post an individual role, launch a targeted campaign, or discuss a confidential senior mandate. Featured placement is labelled. Editorial stays firewalled.',
    href: 'mailto:info@universalassetowners.com?subject=Talent%20desk%20%E2%80%94%20mandate',
  },
] as const;

export const EMPLOYER_PORTALS = [
  {
    id: 'mubadala',
    name: 'Mubadala',
    line: 'Sovereign wealth · Abu Dhabi',
    href: 'https://www.mubadala.com/en/careers',
  },
  {
    id: 'gic',
    name: 'GIC',
    line: 'Sovereign wealth · Singapore',
    href: 'https://careers.gic.com.sg/',
  },
  {
    id: 'nbim',
    name: 'Norges Bank Investment Management',
    line: 'SWF / reserve · Oslo',
    href: 'https://www.nbim.no/en/about-us/career/vacancies/',
  },
  {
    id: 'cpp',
    name: 'CPP Investments',
    line: 'Public pension · Toronto',
    href: 'https://www.cppinvestments.com/careers/search-jobs/',
  },
  {
    id: 'otpp',
    name: 'Ontario Teachers’',
    line: 'Public pension · Toronto',
    href: 'https://www.otpp.com/en-ca/careers/',
  },
  {
    id: 'temasek',
    name: 'Temasek',
    line: 'Sovereign investor · Singapore',
    href: 'https://jobs.temasek.com.sg/',
  },
  {
    id: 'calpers',
    name: 'CalPERS',
    line: 'Public pension · Sacramento',
    href: 'https://www.calpers.ca.gov/about/job-opportunities/job-openings-and-exams/investment-job-opportunities',
  },
  {
    id: 'futurefund',
    name: 'Future Fund',
    line: 'Sovereign wealth · Melbourne',
    href: 'https://www.futurefund.gov.au/en/careers',
  },
] as const;

export const JOB_BOARDS = [
  {
    id: 'allocator',
    name: 'Allocator Jobs',
    line: 'Endowment, foundation, pension and family-office board',
    href: 'https://allocatorjobs.com/',
  },
  {
    id: 'cfa',
    name: 'CFA Institute',
    line: 'Sovereign wealth and institutional roles',
    href: 'https://careers.cfainstitute.org/jobs/?quick=industry%7CSovereign+Wealth+Fund',
  },
  {
    id: 'swfi',
    name: 'SWFI',
    line: 'Sovereign fund and allocator careers',
    href: 'https://www.swfinstitute.org/careers',
  },
  {
    id: 'ifswf',
    name: 'IFSWF',
    line: 'Member sovereign-fund vacancies',
    href: 'https://www.ifswf.org/careers',
  },
] as const;

export const DIARY: readonly { when: string; title: string; blurb: string; href?: string }[] = [
  {
    when: '07:00 ET · weekdays',
    title: 'Morning desk — The Universal Owner',
    blurb: 'Five minutes before the book opens. Complimentary to read.',
  },
  {
    when: 'After lunch · weekdays',
    title: 'The Probability Desk',
    blurb: 'Base, upside, tail. Weights on the mast when the house has printed them.',
  },
  {
    when: 'When we go on air',
    title: 'UAO Live',
    blurb: 'The same YouTube player as the website. Just-missed sits in Studio.',
  },
  {
    when: 'By request',
    title: 'Chatham House briefing',
    blurb:
      'Invite-only conversations with the people who allocate long-horizon capital. Not a public calendar. The desk seats the table.',
    href: 'mailto:info@universalassetowners.com?subject=Briefing%20request%20%E2%80%94%20UAO',
  },
] as const;

export function isHiringSignal(title: string): boolean {
  return /\b(cio|hiring|mandate|search|appointment|named|joins|resigns|steps down|talent)\b/i.test(
    title,
  );
}

export function isHttpsUrl(url: string): boolean {
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}
