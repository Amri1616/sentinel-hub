import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import CaseDetailsView, { getStatusColor, getSeverityColor, type CaseData } from '@/components/shared/CaseDetailsView';
import CaseClarificationThread, { type ClarificationMessage } from '@/components/shared/CaseClarificationThread';
import CaseTimeline, { type TimelineEvent } from '@/components/shared/CaseTimeline';

/* ── Incident lookup data ── */
const incidents = [
  { id: 'PSIRP-2025-0025', reporter: 'Ahmad bin Abdullah', type: 'Theft', severity: 'High', status: 'Under Review', submitted: '2025-01-15', escalated: true, description: 'High-value package theft at sorting facility', attachments: ['evidence-photo.jpg', 'cctv-footage.mp4'] },
  { id: 'PSIRP-2025-0024', reporter: 'Mohd Zaki', type: 'Suspicious Parcel', severity: 'Medium', status: 'Submitted', submitted: '2025-01-14', escalated: false, description: 'Suspicious parcel detected during scanning', attachments: ['scan-report.pdf'] },
  { id: 'PSIRP-2025-0023', reporter: 'Kamal Hassan', type: 'Prohibited Items', severity: 'Low', status: 'Draft', submitted: '2025-01-13', escalated: false, description: 'Prohibited items found in shipment', attachments: [] },
  { id: 'PSIRP-2025-0022', reporter: 'Fatimah Zahra', type: 'Security Breach', severity: 'High', status: 'Escalated', submitted: '2025-01-12', escalated: true, description: 'Unauthorized access to secure area', attachments: ['access-log.csv', 'photo1.jpg'] },
  { id: 'PSIRP-2025-0021', reporter: 'Azman Ali', type: 'Theft', severity: 'Critical', status: 'Closed', submitted: '2025-01-11', escalated: true, description: 'Serial theft case across multiple branches', attachments: ['police-report.pdf'] },
  { id: 'PSIRP-2025-0020', reporter: 'Ahmad bin Abdullah', type: 'Others', severity: 'Low', status: 'Under Review', submitted: '2025-01-10', escalated: false, description: 'Equipment tampering report', attachments: [] },
];

const mapToCaseData = (inc: typeof incidents[0]): CaseData => ({
  id: inc.id,
  title: inc.description,
  dateReported: inc.submitted,
  incidentDate: inc.submitted,
  incidentTime: '—',
  branchName: '—',
  address: '—',
  state: '—',
  postalCode: '—',
  companyName: 'Global Express Logistics Sdn Bhd',
  reporterName: inc.reporter,
  reporterDesignation: 'Reporter',
  status: inc.status,
  severity: inc.severity,
  leaEscalation: inc.escalated ? 'Yes' : 'No',
  description: inc.description,
  primaryIncidentType: inc.type,
  immediateActions: '—',
  incidentControlStatus: '—',
  reportedToAuthority: inc.escalated ? 'Yes' : 'No',
  parcelHandedOver: '—',
  assistanceRequested: [],
  documents: inc.attachments.map(f => ({ name: f, size: '—', uploadedBy: inc.reporter, uploadDate: inc.submitted })),
  items: ['Theft', 'Suspicious Parcel', 'Prohibited Items'].includes(inc.type) ? [{
    tracking: '—', type: 'Standard', declaration: '—', weight: '—', detectedItemType: inc.type,
    sender: { name: '—', address: '—', stateCountry: '—', contact: '—' },
    receiver: { name: '—', address: '—', stateCountry: '—', contact: '—' },
  }] : undefined,
  declarationAgreed: true,
  declarationDate: inc.submitted,
});

/* ── Clarification thread ── */
const mockClarifications: ClarificationMessage[] = [
  { id: 1, from: 'MCMC Case Officer', role: 'officer', timestamp: '2025-01-17 11:00', message: 'Please provide additional CCTV footage from the loading bay area for the period 10:00–14:00 on 14 Jan 2025.', status: 'Responded' },
  { id: 2, from: 'Ahmad bin Abdullah (Reporter)', role: 'reporter', timestamp: '2025-01-17 15:30', message: 'Attached the requested CCTV footage. The footage covers cameras 3 and 5 at the loading bay.' },
  { id: 3, from: 'MCMC Case Officer', role: 'officer', timestamp: '2025-01-18 09:00', message: 'Thank you. Can you also confirm the shift schedule for the security personnel on duty during that time?', status: 'Responded' },
  { id: 4, from: 'Licensee Admin', role: 'admin', timestamp: '2025-01-18 11:45', message: 'The shift schedule has been attached. Security personnel on duty were Mohd Rizal (06:00–14:00) and Tan Wei Ming (14:00–22:00).' },
  { id: 5, from: 'MCMC Case Officer', role: 'officer', timestamp: '2025-01-19 10:00', message: 'Noted, thank you. We also need the internal CCTV footage covering the loading bay from 08:30 AM to 09:30 AM. Can you provide this as part of the evidence package?', status: 'Awaiting Response', isNew: true },
];

export default function LicenseeAdminIncidentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const incident = incidents.find(i => i.id === id);

  if (!incident) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/licensee-admin/incidents')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Incidents
        </Button>
        <p className="text-muted-foreground">Incident not found.</p>
      </div>
    );
  }

  const caseData = mapToCaseData(incident);

  const timeline: TimelineEvent[] = [
    { event: 'Incident Submitted', actor: 'Licensee Reporter', time: incident.submitted + ' 14:30', type: 'submission' },
    { event: 'Assigned to Case Officer', actor: 'System', time: incident.submitted + ' 16:00', type: 'system' },
    { event: 'Under Review', actor: 'Officer Lim', time: '2025-01-16 09:15', type: 'update' },
    { event: 'RFI Sent to Reporter', actor: 'Officer Lim', time: '2025-01-17 11:00', type: 'rfi' },
    ...(incident.escalated ? [{ event: 'Escalated to LEA', actor: 'Supervisor Wong', time: '2025-01-18 14:30', type: 'escalation' as const }] : []),
  ];

  return (
    <div className="space-y-6">
      {/* Back link */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/licensee-admin/incidents')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Incidents
        </Button>
      </div>

      {/* Header — matching Reporter page typography */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{incident.id}</h1>
          <p className="text-muted-foreground">{incident.description} — Global Express Logistics Sdn Bhd</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-sm px-3 py-1 ${getStatusColor(incident.status)}`}>{incident.status}</Badge>
            <Badge variant="outline" className={`text-sm px-3 py-1 ${getSeverityColor(incident.severity)}`}>{incident.severity}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Submitted on: {incident.submitted}
          </p>
        </div>
      </div>

      {/* Tabbed Navigation — matching Reporter page */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="details">Case Details</TabsTrigger>
          <TabsTrigger value="clarification">Clarification</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        {/* Tab 1: Case Details */}
        <TabsContent value="details">
          <CaseDetailsView incident={caseData} />
        </TabsContent>

        {/* Tab 2: Clarification */}
        <TabsContent value="clarification">
          <CaseClarificationThread messages={mockClarifications} glowClass="glow-cyan" />
        </TabsContent>

        {/* Tab 3: Timeline */}
        <TabsContent value="timeline">
          <CaseTimeline events={timeline} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
