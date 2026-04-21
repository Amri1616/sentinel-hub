import { IncidentFormData } from '@/components/reporter/incident-form/types';

export interface CyberCaseSummary {
  id: string;
  title: string;
  organisation: string;
  reporter: string;
  officer: string;
  severity: 'High';
  status: 'Under Review';
  submitted: string;
  lastUpdated: string;
  isOwn: boolean;
  isCyberSpecialCase: boolean;
  escalations: Array<{ name: string; status: string }>;
}

const CYBER_INCIDENT_TYPE = 'Data leakage or cyber incidents';
const CYBER_SPECIALIST_EMAIL = 'cyber.officer@mcmc.gov.my';

function parseStoredIncident(raw: string): (IncidentFormData & { submittedAt?: string }) | null {
  try {
    return JSON.parse(raw) as IncidentFormData & { submittedAt?: string };
  } catch {
    return null;
  }
}

export function getCyberCaseById(id?: string) {
  if (!id || typeof window === 'undefined') return null;
  const raw = localStorage.getItem(`incident_${id}`);
  if (!raw) return null;
  const form = parseStoredIncident(raw);
  if (!form) return null;
  const isCyberSpecialCase = form.primaryIncidentType === CYBER_INCIDENT_TYPE;
  return { form, isCyberSpecialCase };
}

export function getCyberSpecialCases(currentUserEmail?: string): CyberCaseSummary[] {
  if (typeof window === 'undefined') return [];

  const rows: CyberCaseSummary[] = [];

  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith('incident_')) continue;

    const raw = localStorage.getItem(key);
    if (!raw) continue;

    const form = parseStoredIncident(raw);
    if (!form || form.primaryIncidentType !== CYBER_INCIDENT_TYPE) continue;

    const id = key.replace('incident_', '');
    const dt = form.submittedAt ? new Date(form.submittedAt) : new Date();
    const ymd = dt.toISOString().split('T')[0];
    const officer = currentUserEmail === CYBER_SPECIALIST_EMAIL ? 'You' : 'Cyber Specialist Officer';

    rows.push({
      id,
      title: form.primaryIncidentType,
      organisation: form.companyName || 'Unknown Organisation',
      reporter: form.reporterName || 'Unknown Reporter',
      officer,
      severity: 'High',
      status: 'Under Review',
      submitted: ymd,
      lastUpdated: ymd,
      isOwn: currentUserEmail === CYBER_SPECIALIST_EMAIL,
      isCyberSpecialCase: true,
      escalations: [],
    });
  }

  return rows.sort((a, b) => b.submitted.localeCompare(a.submitted));
}

export function isCyberSpecialistEmail(email?: string) {
  return (email || '').toLowerCase() === CYBER_SPECIALIST_EMAIL;
}
