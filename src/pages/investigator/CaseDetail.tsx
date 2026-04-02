import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Lock } from 'lucide-react';
import CaseDetailsView, { getStatusColor, getSeverityColor, type CaseData } from '@/components/shared/CaseDetailsView';
import CaseClarificationThread, { type ClarificationMessage } from '@/components/shared/CaseClarificationThread';
import CaseTimeline, { type TimelineEvent } from '@/components/shared/CaseTimeline';
import { fallbackIncident } from '@/lib/mock-data';
import CaseHeader from '@/components/shared/CaseHeader';

const timelineEvents: TimelineEvent[] = [
  { event: 'Case assigned to Raj Kumar', actor: 'System', time: '2025-06-10 14:30', type: 'system' },
  { event: 'Case submitted by Ali Hassan', actor: 'System', time: '2025-06-10 09:15', type: 'submission' },
  { event: 'Classification: Package Theft — Severity: Medium', actor: 'Raj Kumar', time: '2025-06-11 10:00', type: 'update' },
  { event: 'Clarification requested from reporter', actor: 'Raj Kumar', time: '2025-06-12 11:45', type: 'rfi' },
  { event: 'Clarification response submitted', actor: 'Ali Hassan', time: '2025-06-13 09:30', type: 'response' },
  { event: 'Escalation proposed to PDRM', actor: 'Raj Kumar', time: '2025-06-14 16:00', type: 'escalation' },
  { event: 'Escalation approved', actor: 'Supervisor', time: '2025-06-14 17:30', type: 'update' },
  { event: 'Case escalated to PDRM', actor: 'System', time: '2025-06-15 08:00', type: 'system' },
];

const clarificationMessages: ClarificationMessage[] = [
  { id: 1, from: 'Case Officer (Raj Kumar)', role: 'officer', message: 'Please confirm the exact time the parcel was last scanned in the system and provide the shift roster for sorting lane 3.', timestamp: '2025-06-12 11:45', status: 'Responded' },
  { id: 2, from: 'Licensee Reporter (Ali Hassan)', role: 'reporter', message: 'Last scan recorded at 14:22:45. Shift roster attached — 3 staff members assigned to lane 3 between 14:00–16:00.', timestamp: '2025-06-13 09:30' },
  { id: 3, from: 'Case Officer (Raj Kumar)', role: 'officer', message: 'Thank you. Can you also get confirmation from the Licensee Admin on internal disciplinary actions taken?', timestamp: '2025-06-13 15:00', status: 'Responded' },
  { id: 4, from: 'Licensee Admin', role: 'admin', message: 'Internal review completed. Staff member has been suspended pending investigation. Documentation attached.', timestamp: '2025-06-14 10:00' },
];

export default function InvestigatorCaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const incident = fallbackIncident(id || 'PSIRP-2025-0063');

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
        backLabel="Back to All Cases"
        onBack={() => navigate('/internal/cases')}
        topBadges={
          <Badge variant="outline" className="bg-role-investigator/10 text-role-investigator border-role-investigator/30 gap-1 opacity-70">
            <Lock className="h-3 w-3" /> Strategic Oversight — Read-Only
          </Badge>
        }
      />

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 h-12 border border-border/40">
          <TabsTrigger value="details" className="px-6 h-full font-medium transition-all">Case Details</TabsTrigger>
          <TabsTrigger value="assessment" className="px-6 h-full font-medium transition-all">Officer Assessment</TabsTrigger>
          <TabsTrigger value="clarification" className="px-6 h-full font-medium transition-all flex items-center gap-2">
            Clarification
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
            </span>
          </TabsTrigger>
          <TabsTrigger value="escalation" className="px-6 h-full font-medium transition-all">Escalation History</TabsTrigger>
          <TabsTrigger value="timeline" className="px-6 h-full font-medium transition-all">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <CaseDetailsView incident={incident} />
        </TabsContent>

        <TabsContent value="assessment">
          <Card>
            <CardHeader><CardTitle>Officer Assessment</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">

                <div><p className="text-xs text-muted-foreground">Severity</p><p className="text-sm font-medium">Medium</p></div>
                <div><p className="text-xs text-muted-foreground">Risk Indicator</p><p className="text-sm font-medium">Moderate</p></div>
                <div><p className="text-xs text-muted-foreground">Assigned Officer</p><p className="text-sm font-medium">Raj Kumar</p></div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Preliminary Findings</p>
                <p className="text-sm">CCTV footage confirms the parcel entered sorting lane 3 at 14:22. No record of it reaching dispatch. Possible internal handling issue or theft. Awaiting further CCTV review from secondary cameras.</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Internal Notes</p>
                <div className="space-y-2">
                  <div className="p-3 border border-border/40 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Raj Kumar — 2025-06-11 10:30</p>
                    <p className="text-sm mt-1">Checked with hub supervisor. Two staff members had access to lane 3 during the window.</p>
                  </div>
                  <div className="p-3 border border-border/40 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground">Raj Kumar — 2025-06-13 15:00</p>
                    <p className="text-sm mt-1">Reporter confirmed the parcel was properly labeled and scanned at intake.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clarification">
          <CaseClarificationThread messages={[]} isReadOnly={true} />
        </TabsContent>

        <TabsContent value="escalation">
          <Card>
            <CardHeader><CardTitle>Escalation History</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-border/40 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Escalation to PDRM</p>
                  <Badge variant="outline" className="border-status-closed/50 text-status-closed">Approved</Badge>
                </div>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Proposed by:</span> Raj Kumar</div>
                  <div><span className="text-muted-foreground">Date:</span> 2025-06-14</div>
                  <div><span className="text-muted-foreground">Approved by:</span> Supervisor Ahmad</div>
                  <div><span className="text-muted-foreground">Approval Date:</span> 2025-06-14</div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground">Justification</p>
                  <p className="text-sm mt-1">Evidence suggests possible internal theft. CCTV confirms parcel entered sorting area but did not reach dispatch. Recommend police investigation.</p>
                </div>
              </div>
              <div className="p-4 border border-border/40 rounded-lg">
                <p className="text-sm font-medium mb-2">LEA Updates</p>
                <p className="text-sm text-muted-foreground">PDRM acknowledged receipt of referral. Investigation pending assignment.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <CaseTimeline events={timelineEvents} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
