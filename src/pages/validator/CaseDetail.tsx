import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CaseDetailsView, { getStatusColor, getSeverityColor, type CaseData } from '@/components/shared/CaseDetailsView';
import CaseClarificationThread, { type ClarificationMessage } from '@/components/shared/CaseClarificationThread';
import CaseTimeline, { type TimelineEvent } from '@/components/shared/CaseTimeline';
import { fallbackIncident } from '@/lib/mock-data';
import CaseHeader from '@/components/shared/CaseHeader';

const timelineEvents: TimelineEvent[] = [
  { event: 'Incident submitted by Licensee Reporter', actor: 'System', time: '2025-06-09 09:15', type: 'submission' },
  { event: 'Assigned to Case Officer Ahmad Razif', actor: 'System', time: '2025-06-09 10:30', type: 'system' },
  { event: 'Initial assessment completed – Severity: Critical', actor: 'Ahmad Razif', time: '2025-06-09 14:00', type: 'update' },
  { event: 'Escalation request submitted to Supervisor', actor: 'Ahmad Razif', time: '2025-06-10 09:00', type: 'escalation' },
  { event: 'Status changed to Escalation Pending Approval', actor: 'System', time: '2025-06-10 11:45', type: 'system' },
];

const clarificationMessages: ClarificationMessage[] = [
  { id: 1, from: 'Case Officer (Ahmad Razif)', role: 'officer', message: 'Please provide the access control logs for the past 48 hours and confirm whether CCTV footage from Camera 3 and 7 is available.', timestamp: '2025-06-09 09:30', status: 'Responded' },
  { id: 2, from: 'Licensee Reporter (Ali Hassan)', role: 'reporter', message: 'Access control logs attached. CCTV footage from Camera 3 is available and being prepared for secure transfer.', timestamp: '2025-06-09 10:15' },
  { id: 3, from: 'Licensee Admin', role: 'admin', message: 'Confirmed internal review of the incident. All relevant documentation has been gathered.', timestamp: '2025-06-09 14:00' },
  { id: 4, from: 'Case Officer (Ahmad Razif)', role: 'officer', message: 'Thank you. Can you also provide the visitor log for the restricted zone during 01:00–05:00?', timestamp: '2025-06-10 08:00', status: 'Awaiting Response', isNew: true },
];



export default function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const incident = fallbackIncident(id || 'PSIRP-2025-0042');

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
        backLabel="Back to Queue"
        onBack={() => navigate('/supervisor/escalations')}
      />

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 h-12 border border-border/40">
          <TabsTrigger value="details" className="px-6 h-full font-medium transition-all">Case Details</TabsTrigger>
          <TabsTrigger value="assessment" className="px-6 h-full font-medium transition-all">Officer Assessment</TabsTrigger>
          <TabsTrigger value="rfis" className="px-6 h-full font-medium transition-all flex items-center gap-2">
            Clarification
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
            </span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="px-6 h-full font-medium transition-all">Timeline</TabsTrigger>
          <TabsTrigger value="escalation" className="px-6 h-full font-medium transition-all">Escalation Info</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <CaseDetailsView incident={incident} />
        </TabsContent>

        <TabsContent value="assessment">
          <Card>
            <CardHeader><CardTitle>Case Officer Assessment</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[

                ['Severity Level', 'Critical'],
                ['Preliminary Findings', 'Evidence suggests organised theft ring operating within the hub. Pattern matches 3 prior incidents in Q1. CCTV evidence confirms unauthorized entry at 02:15 AM.'],
                ['Risk Indicator', 'High – Potential for recurrence'],
              ].map(([l, v]) => (
                <div key={l}><p className="text-xs text-muted-foreground">{l}</p><p className="text-sm">{v}</p></div>
              ))}
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Internal Notes</p>
                <div className="space-y-2">
                  {[
                    { note: 'Spoke with facility manager – confirms 2 new hires had access cards issued without full vetting.', by: 'Ahmad Razif', date: '2025-06-09 15:30' },
                    { note: 'Cross-referenced with PSIRP-2025-0030 – similar MO. Recommend combined escalation.', by: 'Ahmad Razif', date: '2025-06-10 08:45' },
                  ].map((n, i) => (
                    <div key={i} className="p-3 border border-border/40 rounded-lg bg-accent/20">
                      <p className="text-sm">{n.note}</p>
                      <p className="text-xs text-muted-foreground mt-1">{n.by} · {n.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rfis">
          <CaseClarificationThread
            messages={[]}
            currentRole="supervisor"
            replyPlaceholder="Send a message as MCMC Supervisor..."
          />
        </TabsContent>

        <TabsContent value="timeline">
          <CaseTimeline events={timelineEvents} />
        </TabsContent>

        <TabsContent value="escalation">
          <Card>
            <CardHeader><CardTitle>Escalation Request</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                ['Requesting Officer', 'Ahmad Razif (CO-2024-015)'],
                ['Request Date', '2025-06-10 09:00'],
                ['Selected LEA(s)', 'Royal Malaysia Police (PDRM) – Commercial Crime Division'],
                ['Justification', 'Strong evidence of organised theft pattern at KL Central Hub. CCTV footage confirms unauthorized access. Pattern matches prior incidents suggesting systematic operation. Recommend immediate LEA involvement for criminal investigation.'],
              ].map(([l, v]) => (
                <div key={l}><p className="text-xs text-muted-foreground">{l}</p><p className="text-sm">{v}</p></div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
