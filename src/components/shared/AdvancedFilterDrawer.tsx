import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Filter, SlidersHorizontal } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface AdvancedFilters {
  // Timeline
  dateFrom: string;
  dateTo: string;
  // Categorisation
  status: string;
  severity: string;
  incidentType: string;
  // Geography
  stateRegion: string;
  countryOrigin: string;
  countryDestination: string;
  // Report Details
  trackingNo: string;
  senderRecipient: string;
  // Escalation
  agencies: string[]; // Multi-select
  // Logic
  assistanceRequired: string;
  incidentContained: string;
}

const EMPTY_FILTERS: AdvancedFilters = {
  dateFrom: '',
  dateTo: '',
  status: 'all',
  severity: 'all',
  incidentType: 'all',
  stateRegion: 'all',
  countryOrigin: 'all',
  countryDestination: 'all',
  trackingNo: '',
  senderRecipient: '',
  agencies: [],
  assistanceRequired: 'all',
  incidentContained: 'all',
};

// ─── Props ───────────────────────────────────────────────────────────────────

interface AdvancedFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: AdvancedFilters;
  onApply: (filters: AdvancedFilters) => void;
  activeCount?: number;
  hideAgencyFilter?: boolean;
}

// ─── Static options ──────────────────────────────────────────────────────────

const MY_STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
  'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Sabah',
  'Sarawak', 'Selangor', 'Terengganu',
  'W.P. Kuala Lumpur', 'W.P. Labuan', 'W.P. Putrajaya',
];

const COUNTRIES = [
  'Malaysia', 'Singapore', 'Indonesia', 'Thailand', 'Philippines',
  'Vietnam', 'Myanmar', 'Cambodia', 'Laos', 'Brunei',
  'China', 'Japan', 'South Korea', 'India', 'Bangladesh',
  'United States', 'United Kingdom', 'Germany', 'France', 'Australia',
  'Other',
];

const INCIDENT_TYPES = [
  { value: 'prohibited', label: 'Prohibited Items' },
  { value: 'medium', label: 'Medium Risk' },
  { value: 'operational', label: 'Operational Issue' },
  { value: 'theft', label: 'Theft' },
  { value: 'tampering', label: 'Tampering' },
  { value: 'fraud', label: 'Fraud' },
  { value: 'dangerous-goods', label: 'Dangerous Goods' },
  { value: 'security-breach', label: 'Security Breach' },
  { value: 'loss', label: 'Loss / Missing' },
  { value: 'others', label: 'Others' },
];

const LEA_AGENCIES = [
  'K-KOM', 'KKM', 'NRES', 'KPDN', 'MKN', 'PDRM', 'KASTAM', 'KDN', 'MOT', 'AKPS', 'PERHILITAN'
];

const ASSISTANCE_OPTIONS = [
  { value: 'legal-advice', label: 'Legal Advice' },
  { value: 'parcel-inspection', label: 'Parcel Inspection' },
  { value: 'investigation-support', label: 'Investigation Support' },
  { value: 'detention', label: 'Detention / Arrest' },
  { value: 'none', label: 'None Required' },
];

// ─── Section header helper ────────────────────────────────────────────────────

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 pt-1">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      <Separator className="flex-1" />
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function AdvancedFilterDrawer({
  open, onClose, filters, onApply, activeCount = 0, hideAgencyFilter = false,
}: AdvancedFilterDrawerProps) {
  const [draft, setDraft] = useState<AdvancedFilters>(filters);

  // Sync draft when drawer reopens
  const handleOpen = () => setDraft(filters);

  const set = <K extends keyof AdvancedFilters>(key: K, value: AdvancedFilters[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  const handleReset = () => setDraft(EMPTY_FILTERS);

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  const toggleAgency = (agency: string) => {
    setDraft(prev => {
      const agencies = prev.agencies.includes(agency)
        ? prev.agencies.filter(a => a !== agency)
        : [...prev.agencies, agency];
      return { ...prev, agencies };
    });
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer panel */}
      <aside
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-card shadow-2xl border-l border-border"
        style={{ animation: 'slideInRight 0.22s ease' }}
        onAnimationEnd={handleOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <h2 className="font-semibold text-base">Advanced Filters</h2>
            {activeCount > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold">
                {activeCount}
              </span>
            )}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 text-sm">

          {/* ── Timeline ── */}
          <SectionHeader label="Timeline" />
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="adv-date-from">Date From</Label>
              <Input id="adv-date-from" type="date" value={draft.dateFrom} onChange={(e) => set('dateFrom', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="adv-date-to">Date To</Label>
              <Input id="adv-date-to" type="date" value={draft.dateTo} onChange={(e) => set('dateTo', e.target.value)} />
            </div>
          </div>

          {/* ── Categorisation ── */}
          <SectionHeader label="Categorisation" />

          <div className="space-y-1.5">
            <Label>Case Status</Label>
            <Select value={draft.status} onValueChange={(v) => set('status', v)}>
              <SelectTrigger id="adv-status"><SelectValue placeholder="All statuses" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Submitted">Submitted</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="In Review">In Review</SelectItem>
                <SelectItem value="RFI Sent">RFI Sent</SelectItem>
                <SelectItem value="Escalation Pending">Escalation Pending</SelectItem>
                <SelectItem value="Escalated">Escalated</SelectItem>
                <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Severity</Label>
            <Select value={draft.severity} onValueChange={(v) => set('severity', v)}>
              <SelectTrigger id="adv-severity"><SelectValue placeholder="All severities" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Incident Type</Label>
            <Select value={draft.incidentType} onValueChange={(v) => set('incidentType', v)}>
              <SelectTrigger id="adv-incident-type"><SelectValue placeholder="All types" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {INCIDENT_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ── Escalated Agency Multi-select ── */}
          {!hideAgencyFilter && (
            <>
              <SectionHeader label="Escalated To (LEA)" />
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
                {LEA_AGENCIES.map((agency) => (
                  <div key={agency} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`agency-${agency}`} 
                      checked={draft.agencies.includes(agency)}
                      onCheckedChange={() => toggleAgency(agency)}
                    />
                    <label
                      htmlFor={`agency-${agency}`}
                      className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {agency}
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ── Geography ── */}
          <SectionHeader label="Geography" />

          <div className="space-y-1.5">
            <Label>State / Region</Label>
            <Select value={draft.stateRegion} onValueChange={(v) => set('stateRegion', v)}>
              <SelectTrigger id="adv-state"><SelectValue placeholder="All states" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {MY_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Country of Origin</Label>
              <Select value={draft.countryOrigin} onValueChange={(v) => set('countryOrigin', v)}>
                <SelectTrigger id="adv-origin"><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Country of Destination</Label>
              <Select value={draft.countryDestination} onValueChange={(v) => set('countryDestination', v)}>
                <SelectTrigger id="adv-dest"><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ── Report Details ── */}
          <SectionHeader label="Report Details" />

          <div className="space-y-1.5">
            <Label htmlFor="adv-tracking">Tracking / Consignment No.</Label>
            <Input
              id="adv-tracking"
              placeholder="e.g. MY123456789"
              value={draft.trackingNo}
              onChange={(e) => set('trackingNo', e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="adv-sender">Sender / Recipient Name</Label>
            <Input
              id="adv-sender"
              placeholder="Search by name..."
              value={draft.senderRecipient}
              onChange={(e) => set('senderRecipient', e.target.value)}
            />
          </div>

          {/* ── Specific Logic ── */}
          <SectionHeader label="Specific Logic" />

          <div className="space-y-1.5">
            <Label>Assistance Required</Label>
            <Select value={draft.assistanceRequired} onValueChange={(v) => set('assistanceRequired', v)}>
              <SelectTrigger id="adv-assistance"><SelectValue placeholder="Any" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                {ASSISTANCE_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Incident Contained</Label>
            <div className="flex gap-2">
              {(['all', 'yes', 'no'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  id={`adv-contained-${v}`}
                  onClick={() => set('incidentContained', v)}
                  className={`flex-1 py-2 rounded-md border text-sm font-medium transition-colors
                    ${draft.incidentContained === v
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-transparent border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                    }`}
                >
                  {v === 'all' ? 'Any' : v === 'yes' ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-border shrink-0">
          <Button variant="outline" className="flex-1" onClick={handleReset}>
            Reset
          </Button>
          <Button className="flex-1" onClick={handleApply}>
            <Filter className="h-4 w-4 mr-1.5" />
            Apply Filters
          </Button>
        </div>
      </aside>

      {/* Slide-in keyframe */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export { EMPTY_FILTERS };

/** Count how many filter fields differ from the empty/default state */
export function countActiveFilters(f: AdvancedFilters): number {
  return Object.entries(f).filter(([k, v]) => {
    const empty = EMPTY_FILTERS[k as keyof AdvancedFilters];
    
    // special handling for arrays
    if (Array.isArray(v)) {
        return v.length > 0;
    }

    return v !== empty && v !== '' && v !== 'all';
  }).length;
}
