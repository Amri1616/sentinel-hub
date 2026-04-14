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
  MessageSquare, Mail, Copy, Share2, Users, ChevronRight,
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
  const [otherAgency, setOtherAgency] = useState('');
  const [copied, setCopied] = useState(false);
  const [transferOfficer, setTransferOfficer] = useState('');
  const [transferJustification, setTransferJustification] = useState('');

  // Initialize Share Logic
  const incidentData = fallbackIncident(id || 'PSIRP-2025-0028');
  const caseUrl = `https://portal.mcmc.gov.my/cases/${incidentData.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(caseUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Case Report: ${incidentData.id} — ${incidentData.title}\n${caseUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(`Case Report: ${incidentData.id}`);
    const body = encodeURIComponent(`Hi,\n\nPlease find the case report for ${incidentData.id} — ${incidentData.title}.\n\nLink: ${caseUrl}\n\nRegards`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const peerComments = [
    { author: 'Nurul Hana', comment: 'Similar MO observed in PSIRP-2025-0030 — recommend cross-referencing access logs.', date: '2025-01-16 11:00' },
    { author: 'Lee Wei', comment: 'Confirmed pattern matches with Warehouse Break-in case from last week.', date: '2025-01-16 14:30' },
  ];

  const ownCaseIds = ['PSIRP-2025-0028', 'PSIRP-2025-0027', 'PSIRP-2025-0026'];
  const isPeerReview = !ownCaseIds.includes(id || '');

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

    if (selectedAgencies.includes('OTHERS') && !otherAgency.trim()) {
      toast({ title: 'Missing Information', description: 'Please specify the other agency name.', variant: 'destructive' });
      return;
    }

    toast({ title: 'Escalation Submitted', description: 'Awaiting Supervisor approval.' });
    setEscalationJustification('');
    setSelectedAgencies([]);
    setOtherAgency('');
  };

  const handleSaveAssessment = () => {
    toast({ title: 'Assessment Saved', description: 'Findings have been recorded.' });
    navigate('/case-officer/all-cases');
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
        backLabel="Back"
        onBack={() => navigate('/case-officer/all-cases')}
        escalatedTo={incident.escalations?.map(e => e.agency)}
        actions={
          !isPeerReview ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="bg-background">
                  <Share2 className="h-4 w-4 mr-2" /> Share Case Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader><DialogTitle>Share Case Report</DialogTitle></DialogHeader>
                <div className="space-y-5 py-4">
                  <div>
                    <p className="text-sm font-medium mb-3">Share via</p>
                    <div className="flex gap-3">
                      <Button onClick={handleShareWhatsApp} className="flex-1 gap-2 text-white" style={{ backgroundColor: '#25D366' }}>
                        <MessageSquare className="h-4 w-4" /> WhatsApp
                      </Button>
                      <Button onClick={handleShareEmail} variant="outline" className="flex-1 gap-2">
                        <Mail className="h-4 w-4" /> Email
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                    <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">or copy link</span></div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Secure Public Link</Label>
                    <div className="flex gap-2">
                      <Input readOnly value={caseUrl} className="text-sm bg-muted/40 cursor-default" onClick={(e) => (e.target as HTMLInputElement).select()} />
                      <Button variant="outline" size="icon" className={`shrink-0 transition-colors ${copied ? 'border-status-closed/50 text-status-closed' : ''}`} onClick={handleCopyLink}>
                        {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    {copied && <p className="text-xs text-status-closed mt-1.5 animate-in fade-in">Link copied to clipboard!</p>}
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      <strong>Note:</strong> This link provides read-only access to case details. Ensure you only share this with authorized peers or supervisors.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ) : undefined
        }
      />

      {isPeerReview && (
        <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-300">
          <Badge className="bg-[#044cd0] hover:bg-[#033ba3]">Peer Review Mode</Badge>
          <p className="text-sm text-blue-700 font-medium">Viewing as Peer Reviewer — Assessment actions are read-only except for comments.</p>
        </div>
      )}

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 h-12 border border-border/40">
          <TabsTrigger value="details" className="px-6 h-full font-medium transition-all">Case Details</TabsTrigger>
          <TabsTrigger value="clarification" className="px-6 h-full font-medium transition-all flex items-center gap-2">
            Clarification
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-40"></span>
              <Badge className="relative h-5 min-w-[20px] px-1.5 border-0 rounded-full bg-destructive flex items-center justify-center text-[10px] font-bold text-destructive-foreground">
                2
              </Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="px-6 h-full font-medium transition-all">Timeline</TabsTrigger>
          <TabsTrigger value="assessment" className="px-6 h-full font-medium transition-all">Assessment</TabsTrigger>
          <TabsTrigger value="actions" className="px-6 h-full font-medium transition-all">Actions</TabsTrigger>
        </TabsList>

        {/* Tab 1: Case Details */}
        <TabsContent value="details">
          <CaseDetailsView incident={incident} />
        </TabsContent>

        {/* Tab 4: Assessment */}
        <TabsContent value="assessment">
          <div className="space-y-6">
            {!isPeerReview ? (
              <>
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
                      <Label className="flex items-center gap-2"><StickyNote className="h-4 w-4" />Internal Notes (Strictly Private)</Label>
                      <Textarea value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} placeholder="Personal working notes. Invisible to all other roles..." rows={3} className="border-role-reviewer/20" />
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                        🔒 <span className="opacity-80">Data Siloed: Completely hidden from Peers, Supervisors, and Reporters.</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 space-y-3">
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
                    <div className="flex justify-end pt-2">
                      <Button onClick={handleSaveAssessment} className="glow-blue">Save Assessment</Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* Peer Reviewer Read-Only View */}
                <Card className="border-role-reviewer/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-role-reviewer">
                      <ShieldAlert className="h-5 w-5" />
                      Case Officer Assessment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-8">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current Internal Status</p>
                        <Badge variant="outline" className={`${getStatusColor(incident.status)} text-sm px-3 py-1`}>{incident.status}</Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Severity Level</p>
                        <Badge variant="outline" className={`${getSeverityColor(incident.severity)} px-2.5 py-0.5 rounded-full text-sm`}>{incident.severity}</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Preliminary Findings</p>
                      <div className="p-4 rounded-lg bg-muted/20 border border-border/40">
                        <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{preliminaryFindings || "No preliminary findings recorded by the Case Officer yet."}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 space-y-3">
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
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </TabsContent>

        {/* Tab 5: Actions */}
        <TabsContent value="actions">
          {!isPeerReview ? (
            <Card>
              <CardHeader><CardTitle className="text-sm">Case Actions</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full h-12 justify-start font-semibold rounded-lg border-border/80 bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:bg-accent/70 focus-visible:ring-2 focus-visible:ring-primary/40 transition-all" onClick={() => handleUpdateStatus('Under Review')}>
                  <CheckCircle2 className="mr-2 h-4 w-4 text-status-submitted" />Under Review
                  <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
                </Button>

                {(incident.severity === 'Low' || incident.severity === 'Medium') ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full h-12 justify-start font-semibold rounded-lg border-status-closed/40 bg-status-closed/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-status-closed hover:bg-status-closed/10 focus-visible:ring-2 focus-visible:ring-status-closed/30 transition-all">
                        <CheckCircle2 className="mr-2 h-4 w-4" />Close Case
                        <ChevronRight className="ml-auto h-4 w-4 text-status-closed/70" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Close Case - {incident.id}</DialogTitle></DialogHeader>
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full h-12 justify-start font-semibold rounded-lg border-status-closed/40 bg-status-closed/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-status-closed hover:bg-status-closed/10 focus-visible:ring-2 focus-visible:ring-status-closed/30 transition-all">
                        <CheckCircle2 className="mr-2 h-4 w-4" />Request Closure Approval
                        <ChevronRight className="ml-auto h-4 w-4 text-status-closed/70" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Request Case Closure</DialogTitle></DialogHeader>
                      <p className="text-sm text-muted-foreground">This request will be routed to the MCMC Supervisor for final approval.</p>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Justification for Closure</Label>
                          <Textarea value={clarificationMessage} onChange={(e) => setClarificationMessage(e.target.value)} placeholder="Provide your full justification for requesting case closure..." rows={4} />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={() => { handleUpdateStatus('Recommendation for Closure'); toast({ title: 'Closure Request Submitted', description: 'Routed to Supervisor for approval.' }); setClarificationMessage(''); }}>
                          <CheckCircle2 className="mr-2 h-4 w-4" />Submit Request
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full h-12 justify-start font-semibold rounded-lg border-destructive/40 bg-destructive/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-destructive hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-destructive/30 transition-all">
                      <ArrowUpRight className="mr-2 h-4 w-4" />Propose Escalation to LEA
                      <ChevronRight className="ml-auto h-4 w-4 text-destructive/70" />
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
                              'AKPS', 'ATOM MALAYSIA', 'CSM', 'CUSTOMS', 'KDN', 'PHARMACY (KKM)', 'KPDN', 'MCMC', 'MOT', 'NACSA', 'NRES', 'PDRM', 'PERHILITAN', 'OTHERS'
                            ].map((agency) => (
                              <div key={agency} data-agency={agency} className="flex items-center gap-2 py-1">
                                <Checkbox checked={selectedAgencies.includes(agency)} onCheckedChange={(checked) => { if (checked) setSelectedAgencies((prev) => [...prev, agency]); else setSelectedAgencies((prev) => prev.filter((a) => a !== agency)); }} />
                                <Label className="text-sm cursor-pointer">{agency}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        {selectedAgencies.includes('OTHERS') && (
                          <div className="space-y-2 mt-4 animate-in fade-in slide-in-from-top-1 duration-200">
                            <Label className="text-destructive font-medium">Specify Other Agency Name *</Label>
                            <Input placeholder="Enter agency name..." value={otherAgency} onChange={(e) => setOtherAgency(e.target.value)} required className="border-destructive/40 focus-visible:ring-destructive" />
                          </div>
                        )}
                        {selectedAgencies.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-4">
                            {selectedAgencies.map((a) => (
                              <Badge key={a} variant="outline" className="text-xs cursor-pointer hover:bg-destructive/10" onClick={() => setSelectedAgencies((prev) => prev.filter((x) => x !== a))}>
                                {a === 'OTHERS' && otherAgency ? `OTHERS (${otherAgency})` : a} x
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

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full h-12 justify-start font-semibold rounded-lg border-blue-300 bg-blue-50/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-blue-700 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-300 transition-all">
                      <Users className="mr-2 h-4 w-4" />Request Case Transfer
                      <ChevronRight className="ml-auto h-4 w-4 text-blue-500" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Case Transfer</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Target Case Officer *</Label>
                        <Select value={transferOfficer} onValueChange={setTransferOfficer}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select officer..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hanis">Hanis Zakaria (CO-2024-008)</SelectItem>
                            <SelectItem value="faizal">Faizal Ariffin (CO-2024-021)</SelectItem>
                            <SelectItem value="sarah">Sarah Lim (CO-2024-005)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Transfer Justification</Label>
                        <Textarea
                          value={transferJustification}
                          onChange={(e) => setTransferJustification(e.target.value)}
                          placeholder="Explain why this case needs to be transferred to another officer (e.g., workload, conflict of interest, specialised expertise)..."
                          rows={4}
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground bg-blue-50 p-2 rounded border border-blue-100 italic">
                        This request will be routed to the MCMC Supervisor for final approval. The case will remain in your queue until approved.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={!transferOfficer}
                        onClick={() => {
                          toast({ title: 'Transfer Request Submitted', description: 'Routed to Supervisor for formal approval.' });
                          setTransferJustification('');
                          setTransferOfficer('');
                        }}
                      >
                        <Send className="mr-2 h-4 w-4" />Submit Transfer Request
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Case Actions are available only to the assigned Case Officer.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tab 3: Clarification */}
        <TabsContent value="clarification">
          <CaseClarificationThread
            messages={[]}
            currentRole="officer"
            replyPlaceholder="Enter your clarification request to the reporter..."
            glowClass="glow-blue"
            isReadOnly={isPeerReview}
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
