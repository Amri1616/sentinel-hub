import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import CaseDetailsView, { getStatusColor, getSeverityColor, type CaseData } from '@/components/shared/CaseDetailsView';
import CaseClarificationThread, { type ClarificationMessage } from '@/components/shared/CaseClarificationThread';
import CaseTimeline, { type TimelineEvent } from '@/components/shared/CaseTimeline';
import { fallbackIncident } from '@/lib/mock-data';
import CaseHeader from '@/components/shared/CaseHeader';

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

  const incident = fallbackIncident(id || 'PSIRP-2025-0025');
  const caseData = incident;

  const timeline: TimelineEvent[] = [
    { event: 'Incident Submitted', actor: 'Licensee Reporter', time: incident.dateReported, type: 'submission' },
    { event: 'Assigned to Case Officer', actor: 'System', time: incident.dateReported, type: 'system' },
    { event: 'Under Review', actor: 'Officer Lim', time: '2025-01-16 09:15', type: 'update' },
    { event: 'RFI Sent to Reporter', actor: 'Officer Lim', time: '2025-01-17 11:00', type: 'rfi' },
    ...(incident.leaEscalation === 'Yes' ? [{ event: 'Escalated to LEA', actor: 'Supervisor Wong', time: '2025-01-18 14:30', type: 'escalation' as const }] : []),
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <CaseHeader
        id={incident.id}
        title={incident.title}
        companyName={incident.companyName}
        status={incident.status}
        statusColor={getStatusColor(incident.status)}
        severity={incident.severity}
        severityColor={getSeverityColor(incident.severity)}
        submittedDate={incident.dateReported?.split(' ')[0] || incident.incidentDate}
        backLabel="Back to Incidents"
        onBack={() => navigate('/licensee-admin/incidents')}
        escalatedTo={incident.escalations?.map(e => e.agency)}
      />

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 h-12 border border-border/40">
          <TabsTrigger value="details" className="px-6 h-full font-medium transition-all">Case Details</TabsTrigger>
          <TabsTrigger value="clarification" className="px-6 h-full font-medium transition-all flex items-center gap-2">
            Clarification
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
            </span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="px-6 h-full font-medium transition-all">Timeline</TabsTrigger>
        </TabsList>

        {/* Tab 1: Case Details */}
        <TabsContent value="details">
          <CaseDetailsView incident={caseData} />
        </TabsContent>

        {/* Tab 2: Clarification */}
        <TabsContent value="clarification">
          <CaseClarificationThread messages={[]} currentRole="admin" />
        </TabsContent>

        {/* Tab 3: Timeline */}
        <TabsContent value="timeline">
          <CaseTimeline events={timeline} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
