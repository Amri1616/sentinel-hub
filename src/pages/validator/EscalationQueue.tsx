import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Eye, AlertTriangle, ArrowLeft, MessageSquare, RotateCcw } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import CaseDetailsView from '@/components/shared/CaseDetailsView';
import CaseClarificationThread from '@/components/shared/CaseClarificationThread';
import CaseTimeline, { type TimelineEvent } from '@/components/shared/CaseTimeline';
import { fallbackIncident } from '@/lib/mock-data';

const pendingEscalations = [
  { id: 'PSIRP-2025-0045', title: 'High-value theft – KL hub', officer: 'Ahmad Razif', severity: 'Critical', lea: ['PDRM', 'NACSA'], submitted: '2025-06-10', days: 2 },
  { id: 'PSIRP-2025-0052', title: 'Dangerous goods interception', officer: 'Nurul Hana', severity: 'High', lea: ['PDRM', 'NACSA'], submitted: '2025-06-10', days: 1 },
  { id: 'PSIRP-2025-0058', title: 'Suspicious parcel pattern', officer: 'Lee Wei', severity: 'High', lea: ['PDRM', 'CUSTOMS'], submitted: '2025-06-08', days: 3 },
  { id: 'PSIRP-2025-0060', title: 'Cross-border contraband attempt', officer: 'Farah Amin', severity: 'Critical', lea: ['CUSTOMS', 'MCMC', 'CSM'], submitted: '2025-06-10', days: 1 },
  { id: 'PSIRP-2025-0063', title: 'Tampering at sorting centre', officer: 'Raj Kumar', severity: 'Medium', lea: ['PDRM', 'MOT'], submitted: '2025-06-09', days: 4 },
];

const timelineEvents: TimelineEvent[] = [
  { event: 'Incident submitted by Licensee Reporter', actor: 'System', time: '2025-06-09 09:15', type: 'submission' },
  { event: 'Assigned to Case Officer Ahmad Razif', actor: 'System', time: '2025-06-09 10:30', type: 'system' },
  { event: 'Initial assessment completed', actor: 'Ahmad Razif', time: '2025-06-09 14:00', type: 'update' },
  { event: 'Escalation request submitted to Supervisor', actor: 'Ahmad Razif', time: '2025-06-10 09:00', type: 'escalation' },
  { event: 'Status changed to Escalation Pending Approval', actor: 'System', time: '2025-06-10 11:45', type: 'system' },
];

export default function EscalationQueue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [decisionComment, setDecisionComment] = useState('');

  // If viewing a specific escalation, show detail
  if (id) {
    const esc = pendingEscalations.find((e) => e.id === id);
    if (!esc) return <p className="text-muted-foreground">Escalation not found.</p>;
    const incident = fallbackIncident(esc.id);

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground p-0 h-auto flex items-center mb-3"
              onClick={() => navigate('/supervisor/escalations')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Queue
            </Button>
            <h1 className="text-3xl font-bold">{esc.id}</h1>
            <p className="text-muted-foreground">{esc.title}</p>
          </div>
          <Badge variant="outline" className={esc.severity === 'Critical' ? 'bg-destructive/20 text-destructive border-destructive/30' : 'bg-status-in-review/20 text-status-in-review border-status-in-review/30'}>{esc.severity}</Badge>
        </div>

        <Card className={cn('border-2 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500 shadow-lg border-amber-400 bg-amber-50/30')}>
          <CardHeader className="p-4 border-b bg-amber-100/50">
            <CardTitle className="text-base flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-700" />
                <span className="text-amber-900">Pending Escalation Approval</span>
              </div>
              <Badge variant="outline" className="bg-amber-600 text-white border-amber-700">Urgent Action</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Escalation Details</h4>
                  <div className="bg-white/60 p-4 rounded-lg border border-border/50 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Requesting Officer:</span>
                      <span className="font-semibold text-foreground">{esc.officer}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Submitted:</span>
                      <span className="font-semibold text-foreground">{esc.submitted}</span>
                    </div>
                    <div className="flex justify-between text-sm gap-4">
                      <span className="text-muted-foreground">Selected LEA(s):</span>
                      <span className="font-semibold text-amber-800 text-right">{esc.lea.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Justification from Case Officer</h4>
                  <div className="p-4 rounded-lg bg-white/80 border border-border italic text-sm text-foreground/80 leading-relaxed shadow-sm">
                    Strong evidence of criminal activity requiring LEA involvement. Case officer has completed initial assessment and gathered supporting documentation. Severity classification warrants immediate escalation per PSIRP policy framework.
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Supervisor Feedback / Final Instructions
                  </label>
                  <Textarea
                    placeholder="Enter your comments here..."
                    className="min-h-[120px] bg-white border-border/60 focus-visible:ring-amber-400"
                    value={decisionComment}
                    onChange={(e) => setDecisionComment(e.target.value)}
                  />
                  <p className="text-[11px] text-muted-foreground italic">Required if rejecting the request.</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="h-11"
                    onClick={() => navigate(`/supervisor/cases/${esc.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" /> View Full Case
                  </Button>
                  <Button
                    className="flex-1 font-bold h-11 bg-amber-600 hover:bg-amber-700"
                    onClick={() => {
                      toast({ title: 'Escalation Approved', description: `${esc.id} escalated to selected LEAs.` });
                      navigate('/supervisor/escalations');
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" /> Approve Escalation
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 font-bold h-11 text-destructive border-destructive/30 hover:bg-destructive/5"
                    disabled={!decisionComment.trim()}
                    onClick={() => {
                      toast({ title: 'Escalation Rejected', description: 'Case returned to Case Officer with feedback.', variant: 'destructive' });
                      navigate('/supervisor/escalations');
                    }}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" /> Reject & Return
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 h-12 border border-border/40">
            <TabsTrigger value="details" className="px-6 h-full font-medium transition-all">Case Details</TabsTrigger>
            <TabsTrigger value="assessment" className="px-6 h-full font-medium transition-all">Officer Assessment</TabsTrigger>
            <TabsTrigger value="rfis" className="px-6 h-full font-medium transition-all flex items-center gap-2">
              Clarification
              <Badge className="h-5 min-w-[20px] px-1.5 border-0 rounded-full bg-destructive flex items-center justify-center text-[10px] font-bold text-destructive-foreground">
                2
              </Badge>
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
                  ['Severity Level', esc.severity],
                  ['Preliminary Findings', 'Evidence suggests organised criminal activity and repeated pattern indicators based on case chronology and supporting attachments.'],
                  ['Risk Indicator', 'High - Potential for recurrence'],
                ].map(([l, v]) => (
                  <div key={l}><p className="text-xs text-muted-foreground">{l}</p><p className="text-sm">{v}</p></div>
                ))}
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
                  ['Requesting Officer', esc.officer],
                  ['Request Date', `${esc.submitted} 09:00`],
                  ['Selected LEA(s)', esc.lea.join(', ')],
                  ['Justification', 'Strong evidence of organised theft pattern with supporting evidence. Immediate LEA involvement is recommended for criminal investigation.'],
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

  // Queue list view
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pending Tasks</h1>
          <p className="text-muted-foreground">Review and approve/reject escalation requests from Case Officers</p>
        </div>
        <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30 text-sm px-3 py-1">
          <AlertTriangle className="h-4 w-4 mr-1" /> {pendingEscalations.length} Pending
        </Badge>
      </div>

      <Card className="w-full overflow-hidden border">
        <CardContent className="p-0">
          <div className="relative group w-full overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="table-auto w-full text-sm">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Reference</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[200px]">Incident Title</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Officer</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[120px]">Severity</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[150px]">Target LEA</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[140px]">Submitted</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold text-foreground min-w-[100px]">Age (days)</th>
                    <th className="px-3 py-4 text-center align-middle text-sm font-semibold min-w-[100px] text-foreground"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pendingEscalations.map((esc) => (
                    <tr 
                      key={esc.id} 
                      className="border-b hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => navigate(`/supervisor/escalations/${esc.id}`)}
                    >
                      <td className="px-3 py-4 text-center align-middle text-sm font-mono font-bold text-primary">{esc.id}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm whitespace-normal font-medium">{esc.title}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm">{esc.officer}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex justify-center">
                          <Badge variant="outline" className={esc.severity === 'Critical' ? 'border-destructive/50 text-destructive' : 'border-status-in-review/50 text-status-in-review'}>
                            {esc.severity}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <div className="flex flex-wrap justify-center gap-1">
                          {esc.lea.slice(0, 2).map((l, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-slate-100 text-slate-700 border-slate-200 px-1.5 py-0 h-5 text-[10px] font-bold uppercase whitespace-nowrap">
                              {l}
                            </Badge>
                          ))}
                          {esc.lea.length > 2 && (
                            <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/20 px-1.5 py-0 h-5 text-[10px] font-bold">
                              +{esc.lea.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-4 text-center align-middle text-sm text-muted-foreground">{esc.submitted}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm">{esc.days}</td>
                      <td className="px-3 py-4 text-center align-middle text-sm">
                        <Button size="sm" variant="ghost" className="h-8">Review</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Scroll Hint Shadow */}
            <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none bg-gradient-to-l from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-r" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
