import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import {
  ArrowLeft, ShieldAlert, Send, ArrowUpRight, CheckCircle2, StickyNote, User,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CaseDetailsView, { getStatusColor, getSeverityColor, type CaseData } from '@/components/shared/CaseDetailsView';
import CaseClarificationThread, { type ClarificationMessage } from '@/components/shared/CaseClarificationThread';
import CaseTimeline, { type TimelineEvent } from '@/components/shared/CaseTimeline';
import { fallbackIncident } from '@/lib/mock-data';
import CaseHeader from '@/components/shared/CaseHeader';

export default function CaseReview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const [severityLevel, setSeverityLevel] = useState('high');
  const [preliminaryFindings, setPreliminaryFindings] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [clarificationMessage, setClarificationMessage] = useState('');
  const [escalationJustification, setEscalationJustification] = useState('');
  const [selectedAgencies, setSelectedAgencies] = useState<string[]>([]);
  const [replyText, setReplyText] = useState('');
  const [peerComment, setPeerComment] = useState('');

  const peerComments = [
    { author: 'Nurul Hana (CO-2024-018)', comment: 'Similar MO observed in PSIRP-2025-0030 — recommend cross-referencing access logs.', date: '2025-01-16 11:00' },
    { author: 'Lee Wei (CO-2024-022)', comment: 'Confirmed pattern matches with Warehouse Break-in case from last week.', date: '2025-01-16 14:30' },
  ];

  const incident = fallbackIncident(id || 'PSIRP-2025-0028');

  const timeline: TimelineEvent[] = [
    { event: 'Incident Submitted', actor: 'Licensee Reporter', time: '2025-01-16 06:30', type: 'submission' },
    { event: 'Acknowledged by System', actor: 'System', time: '2025-01-16 06:32', type: 'system' },
    { event: 'Assigned to Case Officer', actor: 'System', time: '2025-01-16 07:00', type: 'system' },
    { event: 'Under Review', actor: 'Case Officer', time: '2025-01-16 09:15', type: 'update' },
  ];

  const communications: ClarificationMessage[] = [
    { id: 1, from: 'Case Officer', role: 'officer', message: 'Please provide the access control logs for the past 48 hours and confirm whether any CCTV footage from Camera 3 and 7 is available.', timestamp: '2025-01-16 09:30', status: 'Responded' },
    { id: 2, from: 'Licensee Reporter', role: 'reporter', message: 'Access control logs attached. CCTV footage from Camera 3 is available and being prepared for secure transfer.', timestamp: '2025-01-16 10:15' },
    { id: 3, from: 'Case Officer', role: 'officer', message: 'Thank you. Can you also confirm the exact number of personnel who had access card clearance for the restricted zone during the 02:00–04:00 window?', timestamp: '2025-01-17 08:45', status: 'Awaiting Response', isNew: true },
  ];

  const handleUpdateStatus = (newStatus: string) => {
    toast({ title: 'Status Updated', description: `Case moved to "${newStatus}".` });
  };

  const handleSubmitEscalation = () => {
    if (selectedAgencies.length === 0) {
      toast({ title: 'Missing Information', description: 'Select at least one agency.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Escalation Submitted', description: 'Awaiting Supervisor approval.' });
    setEscalationJustification('');
    setSelectedAgencies([]);
  };

  const handleSaveAssessment = () => {
    toast({ title: 'Assessment Saved', description: 'Findings have been recorded.' });
  };

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
        backLabel="Back to Inbox"
        onBack={() => navigate('/case-officer/inbox')}
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
          <TabsTrigger value="assessment" className="px-6 h-full font-medium transition-all">Assessment & Actions</TabsTrigger>
        </TabsList>

        {/* Tab 1: Case Details */}
        <TabsContent value="details">
          <CaseDetailsView incident={incident} />
        </TabsContent>

        {/* Tab 2: Assessment & Actions */}
        <TabsContent value="assessment">
          <div className="space-y-6">
            {/* Case Actions */}
            <Card>
              <CardHeader><CardTitle className="text-sm">Case Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => handleUpdateStatus('Under Review')}>
                  <CheckCircle2 className="mr-2 h-4 w-4 text-status-submitted" />Under Review
                </Button>

                {/* Case Closure — severity-based logic */}
                {(incident.severity === 'Low' || incident.severity === 'Medium') ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-status-closed" />Close Case
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Close Case – {incident.id}</DialogTitle></DialogHeader>
                      <p className="text-sm text-muted-foreground">As a Case Officer, you can close Low/Medium severity cases directly.</p>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Closure Summary *</Label>
                          <Textarea value={clarificationMessage} onChange={(e) => setClarificationMessage(e.target.value)} placeholder="Provide closure summary..." rows={4} />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={() => { toast({ title: 'Case Closed', description: `${incident.id} has been closed.` }); setClarificationMessage(''); }} disabled={!clarificationMessage.trim()}>
                          <CheckCircle2 className="mr-2 h-4 w-4" />Confirm Closure
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button variant="outline" className="w-full justify-start" onClick={() => { handleUpdateStatus('Recommendation for Closure'); toast({ title: 'Closure Request Submitted', description: 'High/Critical severity — routed to Supervisor for approval.' }); }}>
                    <CheckCircle2 className="mr-2 h-4 w-4 text-status-closed" />Request Closure Approval
                  </Button>
                )}

                {/* Escalation */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-destructive border-destructive/30">
                      <ArrowUpRight className="mr-2 h-4 w-4" />Propose Escalation to LEA
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle>Propose Escalation to LEA</DialogTitle></DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Select LEA Agency(s) *</Label>
                        <div className="relative">
                          <Input
                            placeholder="Search agencies..."
                            className="mb-2"
                            onChange={(e) => {
                              const el = e.target.nextElementSibling as HTMLElement;
                              if (el) {
                                const items = el.querySelectorAll('[data-agency]');
                                items.forEach((item) => {
                                  const name = (item as HTMLElement).dataset.agency || '';
                                  (item as HTMLElement).style.display = name.toLowerCase().includes(e.target.value.toLowerCase()) ? '' : 'none';
                                });
                              }
                            }}
                          />
                          <div className="max-h-48 overflow-y-auto space-y-1 border border-border rounded-lg p-2">
                            {[
                              'K-KOM',
                              'KKM',
                              'NRES',
                              'KPDN',
                              'MKN',
                              'PDRM',
                              'KASTAM',
                              'KDN',
                              'MOT',
                              'AKPS',
                              'PERHILITAN',
                            ].map((agency) => (
                              <div key={agency} data-agency={agency} className="flex items-center gap-2 py-1">
                                <Checkbox
                                  checked={selectedAgencies.includes(agency)}
                                  onCheckedChange={(checked) => {
                                    if (checked) setSelectedAgencies((prev) => [...prev, agency]);
                                    else setSelectedAgencies((prev) => prev.filter((a) => a !== agency));
                                  }}
                                />
                                <Label className="text-sm cursor-pointer">{agency}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        {selectedAgencies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {selectedAgencies.map((a) => (
                              <Badge key={a} variant="outline" className="text-xs cursor-pointer hover:bg-destructive/10" onClick={() => setSelectedAgencies((prev) => prev.filter((x) => x !== a))}>
                                {a} ✕
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Justification</Label>
                        <Textarea value={escalationJustification} onChange={(e) => setEscalationJustification(e.target.value)} placeholder="Provide justification for escalation..." rows={4} />
                      </div>
                      <p className="text-xs text-muted-foreground">This will be routed to MCMC Supervisor for approval.</p>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleSubmitEscalation} variant="destructive">
                        <ArrowUpRight className="mr-2 h-4 w-4" />Submit Escalation Request
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Initial Assessment */}
            <Card className="border-role-reviewer/20">
              <CardHeader><CardTitle className="flex items-center gap-2 text-role-reviewer"><ShieldAlert className="h-5 w-5" />Initial Assessment</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Severity Level *</Label>
                    <Select value={severityLevel} onValueChange={setSeverityLevel}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Preliminary Findings *</Label>
                  <Textarea value={preliminaryFindings} onChange={(e) => setPreliminaryFindings(e.target.value)} placeholder="Document your initial assessment findings..." rows={4} />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><StickyNote className="h-4 w-4" />Internal Notes (private)</Label>
                  <Textarea value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} placeholder="Private notes — not visible to the reporter..." rows={3} className="border-role-reviewer/20" />
                </div>
                <Button onClick={handleSaveAssessment} className="glow-blue">Save Assessment</Button>

                {/* Peer Comments */}
                <div className="pt-4 border-t border-border space-y-3">
                  <Label className="flex items-center gap-2"><User className="h-4 w-4" />Peer Comments</Label>
                  {peerComments.map((pc, i) => (
                    <div key={i} className="p-3 border border-border/40 rounded-lg bg-accent/20">
                      <p className="text-sm">{pc.comment}</p>
                      <p className="text-xs text-muted-foreground mt-1">{pc.author} · {pc.date}</p>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Textarea value={peerComment} onChange={(e) => setPeerComment(e.target.value)} placeholder="Add a comment on this assessment..." rows={2} className="flex-1" />
                    <Button variant="outline" className="self-end" disabled={!peerComment.trim()} onClick={() => { toast({ title: 'Comment Added', description: 'Your comment has been posted.' }); setPeerComment(''); }}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 3: Clarification */}
        <TabsContent value="clarification">
          <CaseClarificationThread
            messages={[]}
            currentRole="officer"
            replyPlaceholder="Enter your clarification request to the reporter..."
            glowClass="glow-blue"
          />
        </TabsContent>

        {/* Tab 4: Timeline */}
        <TabsContent value="timeline">
          <CaseTimeline events={timeline} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
