export const MALAYSIAN_STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
  'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah',
  'Sarawak', 'Selangor', 'Terengganu',
  'W.P. Kuala Lumpur', 'W.P. Labuan', 'W.P. Putrajaya',
];

export const CITIES_BY_STATE: Record<string, string[]> = {
  Johor: ['Johor Bahru', 'Batu Pahat', 'Muar', 'Kluang', 'Pontian'],
  Kedah: ['Alor Setar', 'Sungai Petani', 'Kulim', 'Langkawi'],
  Kelantan: ['Kota Bharu', 'Pasir Mas', 'Tanah Merah', 'Machang'],
  Melaka: ['Melaka City', 'Alor Gajah', 'Jasin'],
  'Negeri Sembilan': ['Seremban', 'Port Dickson', 'Nilai'],
  Pahang: ['Kuantan', 'Temerloh', 'Bentong', 'Pekan'],
  Perak: ['Ipoh', 'Taiping', 'Teluk Intan', 'Sitiawan'],
  Perlis: ['Kangar', 'Arau'],
  'Pulau Pinang': ['George Town', 'Butterworth', 'Bukit Mertajam'],
  Sabah: ['Kota Kinabalu', 'Sandakan', 'Tawau', 'Lahad Datu'],
  Sarawak: ['Kuching', 'Miri', 'Sibu', 'Bintulu'],
  Selangor: ['Shah Alam', 'Petaling Jaya', 'Subang Jaya', 'Klang', 'Kajang'],
  Terengganu: ['Kuala Terengganu', 'Kemaman', 'Dungun'],
  'W.P. Kuala Lumpur': ['Kuala Lumpur'],
  'W.P. Labuan': ['Labuan'],
  'W.P. Putrajaya': ['Putrajaya'],
};

const ZIP_RULES: Array<{ prefix: string; city: string; state: string }> = [
  { prefix: '50', city: 'Kuala Lumpur', state: 'W.P. Kuala Lumpur' },
  { prefix: '51', city: 'Kuala Lumpur', state: 'W.P. Kuala Lumpur' },
  { prefix: '52', city: 'Kuala Lumpur', state: 'W.P. Kuala Lumpur' },
  { prefix: '53', city: 'Kuala Lumpur', state: 'W.P. Kuala Lumpur' },
  { prefix: '54', city: 'Kuala Lumpur', state: 'W.P. Kuala Lumpur' },
  { prefix: '55', city: 'Kuala Lumpur', state: 'W.P. Kuala Lumpur' },
  { prefix: '56', city: 'Kuala Lumpur', state: 'W.P. Kuala Lumpur' },
  { prefix: '57', city: 'Kuala Lumpur', state: 'W.P. Kuala Lumpur' },
  { prefix: '58', city: 'Kuala Lumpur', state: 'W.P. Kuala Lumpur' },
  { prefix: '59', city: 'Kuala Lumpur', state: 'W.P. Kuala Lumpur' },
  { prefix: '43', city: 'Shah Alam', state: 'Selangor' },
  { prefix: '46', city: 'Petaling Jaya', state: 'Selangor' },
  { prefix: '47', city: 'Petaling Jaya', state: 'Selangor' },
  { prefix: '40', city: 'Klang', state: 'Selangor' },
  { prefix: '81', city: 'Johor Bahru', state: 'Johor' },
  { prefix: '80', city: 'Johor Bahru', state: 'Johor' },
  { prefix: '31', city: 'George Town', state: 'Pulau Pinang' },
  { prefix: '30', city: 'Ipoh', state: 'Perak' },
  { prefix: '05', city: 'Kangar', state: 'Perlis' },
  { prefix: '70', city: 'Seremban', state: 'Negeri Sembilan' },
  { prefix: '75', city: 'Melaka City', state: 'Melaka' },
  { prefix: '20', city: 'Kuala Terengganu', state: 'Terengganu' },
  { prefix: '25', city: 'Kuantan', state: 'Pahang' },
  { prefix: '88', city: 'Kota Kinabalu', state: 'Sabah' },
  { prefix: '93', city: 'Kuching', state: 'Sarawak' },
  { prefix: '98', city: 'Labuan', state: 'W.P. Labuan' },
  { prefix: '62', city: 'Putrajaya', state: 'W.P. Putrajaya' },
];

export function lookupMalaysiaByZip(zipCode: string): { city: string; state: string } | null {
  const normalized = (zipCode || '').replace(/\D/g, '');
  if (normalized.length < 2) return null;
  const prefix = normalized.slice(0, 2);
  const match = ZIP_RULES.find((rule) => rule.prefix === prefix);
  return match ? { city: match.city, state: match.state } : null;
}

export function getCitiesForState(state: string): string[] {
  return CITIES_BY_STATE[state] || [];
}
