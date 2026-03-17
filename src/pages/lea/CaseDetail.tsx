import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Lock, CheckCircle, Send, Share2, Copy, CheckCircle2, Mail, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CaseDetailsView, { getStatusColor, type CaseData } from '@/components/shared/CaseDetailsView';
import CaseClarificationThread, { type ClarificationMessage } from '@/components/shared/CaseClarificationThread';
import CaseTimeline, { type TimelineEvent } from '@/components/shared/CaseTimeline';

const timelineEvents: TimelineEvent[] = [
  { event: 'Case escalated to PDRM', actor: 'System', time: '2025-06-15 08:00', type: 'escalation' },
  { event: 'Case receipt acknowledged', actor: 'LEA Officer', time: '2025-06-15 10:30', type: 'update' },
  { event: 'Investigation status: Under Investigation', actor: 'LEA Officer', time: '2025-06-16 09:00', type: 'update' },
  { event: 'Evidence seized from sorting hub', actor: 'LEA Officer', time: '2025-06-18 14:00', type: 'update' },
  { event: 'Clarification requested from MCMC', actor: 'LEA Officer', time: '2025-06-19 11:30', type: 'rfi' },
  { event: 'Clarification response provided', actor: 'MCMC', time: '2025-06-20 09:15', type: 'response' },
  { event: 'Investigation report uploaded', actor: 'LEA Officer', time: '2025-06-22 16:00', type: 'submission' },
];

const clarificationMessages: ClarificationMessage[] = [
  { id: 1, from: 'LEA Officer', role: 'officer', message: 'Can you confirm the exact time the parcel was last scanned in the sorting system? Also, please provide the shift roster for sorting lane 3 on that date.', timestamp: '2025-06-19 11:30', status: 'Responded' },
  { id: 2, from: 'MCMC Case Officer', role: 'supervisor', message: 'Last scan recorded at 14:22:45. Shift roster attached — 3 staff members were assigned to lane 3 between 14:00–16:00.', timestamp: '2025-06-20 09:15' },
  { id: 3, from: 'LEA Officer', role: 'officer', message: 'Thank you. We need the original CCTV footage (not screenshots) from cameras covering lanes 3 and 4 for the period 13:00–17:00.', timestamp: '2025-06-21 10:00', status: 'Awaiting Response', isNew: true },
];

export default function LEACaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [investigationStatus, setInvestigationStatus] = useState('Under Investigation');
  const [acknowledged, setAcknowledged] = useState(true);
  const [internalNotes, setInternalNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const incident: CaseData = {
    id: id || 'ESC-2025-001',
    title: 'Theft of High-Value Consignment',
    dateReported: '2025-06-08 14:00',
    incidentDate: '2025-06-08',
    incidentTime: '14:22',
    branchName: 'KL Central Sorting Hub',
    address: 'Jalan Kuching, 51200 Kuala Lumpur',
    state: 'W.P. Kuala Lumpur',
    postalCode: '51200',
    companyName: 'Global Express Logistics Sdn Bhd',
    reporterName: 'Ali Hassan',
    reporterDesignation: 'Facility Manager',
    status: investigationStatus,
    severity: 'High',
    leaEscalation: 'Yes',
    description: 'A high-value consignment containing electronic goods went missing during transit. CCTV footage confirms the parcel entered sorting lane but did not reach dispatch area. Evidence suggests possible internal theft.',
    primaryIncidentType: 'Theft or loss of postal items',
    observedImpact: 'High',
    systemServiceAffected: 'Sorting & Dispatch System',
    items: [
      { tracking: 'EC-2025-KL-89012', type: 'Standard Parcel', declaration: 'Wireless headphones (RM 450 declared value)', weight: '0.8 kg', detectedItemType: 'Consumer Electronics', sender: { name: 'TechStore Online', address: 'Penang', stateCountry: 'Penang, Malaysia', contact: '+60124567890' }, receiver: { name: 'Ahmad bin Ismail', address: 'Kuala Lumpur', stateCountry: 'KL, Malaysia', contact: '+60198765432' } },
    ],
    immediateActions: 'Facility secured, CCTV preserved, staff interviewed.',
    incidentControlStatus: 'Under Monitoring',
    reportedToAuthority: 'Yes',
    authorityAgency: 'PDRM',
    authorityReference: 'RPT-2025-KL-ESC001',
    parcelHandedOver: 'No',
    assistanceRequested: ['Investigation Support'],
    documents: [
      { name: 'CCTV_Screenshot_Hub3.png', size: '1.8 MB', uploadedBy: 'Ali Hassan', uploadDate: '2025-06-08 14:30' },
      { name: 'Sorting_Log_20250608.pdf', size: '0.6 MB', uploadedBy: 'Ali Hassan', uploadDate: '2025-06-08 14:32' },
      { name: 'Escalation_Justification.pdf', size: '0.4 MB', uploadedBy: 'Ahmad Razif', uploadDate: '2025-06-15 08:00' },
    ],
    declarationAgreed: true,
    declarationDate: '2025-06-08',
  };

  const handleAcknowledge = () => {
    setAcknowledged(true);
    toast({ title: 'Case Acknowledged', description: 'Receipt confirmed and logged in timeline.' });
  };

  const handleStatusUpdate = (status: string) => {
    setInvestigationStatus(status);
    toast({ title: 'Status Updated', description: `Investigation status changed to "${status}".` });
  };



  const handleSaveNotes = () => {
    if (!internalNotes.trim()) return;
    toast({ title: 'Notes Saved', description: 'Internal notes have been saved successfully.' });
  };

  const caseUrl = `https://portal.mcmc.gov.my/cases/${incident.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(caseUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Case Report: ${incident.id} — ${incident.title}\n${caseUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(`Case Report: ${incident.id}`);
    const body = encodeURIComponent(`Hi,\n\nPlease find the case report for ${incident.id} — ${incident.title}.\n\nLink: ${caseUrl}\n\nRegards`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/lea/cases')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cases
        </Button>
        <Badge variant="outline" className="gap-1" style={{ backgroundColor: 'hsl(220 70% 50% / 0.1)', color: 'hsl(220 70% 50%)', borderColor: 'hsl(220 70% 50% / 0.3)' }}>
          <Lock className="h-3 w-3" /> LEA Access — Read-Only Incident Data
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{incident.id}</h1>
          <p className="text-muted-foreground">{incident.title} — {incident.companyName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-primary/50 text-primary text-sm px-3 py-1">{investigationStatus}</Badge>
          {!acknowledged && (
            <Button onClick={handleAcknowledge}>
              <CheckCircle className="h-4 w-4 mr-2" /> Acknowledge Receipt
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" /> Share Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader><DialogTitle>Share Report</DialogTitle></DialogHeader>
              <div className="space-y-5 py-4">
                {/* Share buttons row */}
                <div>
                  <p className="text-sm font-medium mb-3">Share via</p>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleShareWhatsApp}
                      className="flex-1 gap-2 text-white"
                      style={{ backgroundColor: '#25D366' }}
                    >
                      <MessageSquare className="h-4 w-4" /> WhatsApp
                    </Button>
                    <Button
                      onClick={handleShareEmail}
                      variant="outline"
                      className="flex-1 gap-2"
                    >
                      <Mail className="h-4 w-4" /> Email
                    </Button>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-background px-2 text-muted-foreground">or copy link</span></div>
                </div>

                {/* Copy link section */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Page Link</Label>
                  <div className="flex gap-2">
                    <Input
                      readOnly
                      value={caseUrl}
                      className="text-sm bg-muted/40 cursor-default"
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className={`shrink-0 transition-colors ${copied ? 'border-status-closed/50 text-status-closed' : ''}`}
                      onClick={handleCopyLink}
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-xs text-status-closed mt-1.5 animate-in fade-in">Link copied to clipboard!</p>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="details">Case Details</TabsTrigger>
          <TabsTrigger value="investigation">Case Update</TabsTrigger>
          <TabsTrigger value="clarification">Clarification</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <CaseDetailsView incident={incident} />
        </TabsContent>

        <TabsContent value="investigation">
          <Card>
            <CardHeader><CardTitle>Case Update</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Investigation Status</Label>
                <Select value={investigationStatus} onValueChange={handleStatusUpdate}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                    <SelectItem value="Evidence Seized">Evidence Seized</SelectItem>
                    <SelectItem value="Pending Further Information">Pending Further Information</SelectItem>
                    <SelectItem value="Case Referred for Prosecution">Case Referred for Prosecution</SelectItem>
                    <SelectItem value="No Further Action">No Further Action</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-3 border border-border/40 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground mb-1">Current Status</p>
                <Badge variant="outline" className="border-primary/50 text-primary">{investigationStatus}</Badge>
                <p className="text-xs text-muted-foreground mt-2">All status changes are logged with timestamp and user ID.</p>
              </div>

              {/* Internal Notes */}
              <div className="border-t border-border pt-4 space-y-3">
                <Label className="text-base font-semibold">Internal Notes</Label>
                <p className="text-xs text-muted-foreground">Record case status updates, observations, or any relevant information.</p>
                <Textarea
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Write internal notes about the case status, findings, or observations..."
                  rows={4}
                />
                <Button onClick={handleSaveNotes} disabled={!internalNotes.trim()}>
                  Save Notes
                </Button>
              </div>

              {/* Previous Notes */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Previous Notes</Label>
                {[
                  { date: '2025-06-22 16:00', author: 'Insp. Razak', note: 'Investigation report completed. Evidence collected from sorting hub confirms internal involvement. Recommending prosecution.' },
                  { date: '2025-06-18 14:00', author: 'Insp. Razak', note: 'Evidence seized from sorting hub. CCTV footage confirms parcel was diverted at lane 3. Staff member identified.' },
                  { date: '2025-06-16 09:00', author: 'Insp. Razak', note: 'Case received and acknowledged. Initial review of MCMC evidence package completed. Will proceed with on-site investigation.' },
                ].map((n, i) => (
                  <div key={i} className="p-3 border border-border/40 rounded-lg bg-muted/20">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium">{n.author}</p>
                      <p className="text-xs text-muted-foreground">{n.date}</p>
                    </div>
                    <p className="text-sm">{n.note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="clarification">
          <CaseClarificationThread
            messages={clarificationMessages}
            replyPlaceholder="Enter your clarification request to MCMC or Licensee..."
          />
        </TabsContent>

        <TabsContent value="timeline">
          <CaseTimeline events={timelineEvents} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
