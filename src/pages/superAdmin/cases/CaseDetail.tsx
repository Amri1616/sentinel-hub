import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  ShieldAlert, 
  History, 
  Trash2, 
  FileText, 
  MessageSquare, 
  AlertTriangle,
  Download,
  Calendar,
  User,
  Shield
} from 'lucide-react';
import CaseDetailsView, { getStatusColor, getSeverityColor } from '@/components/shared/CaseDetailsView';
import CaseTimeline from '@/components/shared/CaseTimeline';
import CaseHeader from '@/components/shared/CaseHeader';
import { fallbackIncident } from '@/lib/mock-data';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CaseDetailGovernance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteNote, setDeleteNote] = useState("");
  const [confirmText, setConfirmText] = useState("");

  const incident = fallbackIncident(id || 'PSIR-2026-0082');

  const timelineEvents = [
    { event: 'Incident submitted', actor: 'Licensee Reporter', time: '2026-03-08 09:20', type: 'submission' },
    { event: 'Validation started', actor: 'Ahmad Razif', time: '2026-03-08 10:30', type: 'update' },
    { event: 'RFI sent to Licensee', actor: 'Ahmad Razif', time: '2026-03-08 14:00', type: 'system' },
  ];

  const handleSoftDelete = () => {
    if (confirmText !== 'DELETE CASE') {
      toast.error("Please type DELETE CASE to confirm.");
      return;
    }
    toast.error("Case soft-deleted and moved to archival records.");
    setIsDeleteOpen(false);
    navigate('/super-admin/cases');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/super-admin/cases')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Case Governance: {incident.id}</h1>
            <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold flex items-center gap-2 mt-1">
              <ShieldAlert className="h-3 w-3" />
              Administrative Read-Only View
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Archive
          </Button>
          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Soft Delete Case
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Soft Delete Case Record
                </DialogTitle>
                <DialogDescription>
                  This action will hide the case from all active monitoring lists. Mandatory governance justification is required.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Reason for Deletion</Label>
                  <Select onValueChange={setDeleteReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="duplicate">Duplicate Record</SelectItem>
                      <SelectItem value="erroneous">Erroneous Filing</SelectItem>
                      <SelectItem value="legal">Legal Requirement</SelectItem>
                      <SelectItem value="privacy">Privacy Violation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Detailed Remarks</Label>
                  <Textarea 
                    placeholder="Enter detailed justification for audit purposes..."
                    value={deleteNote}
                    onChange={(e) => setDeleteNote(e.target.value)}
                  />
                </div>
                <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-md">
                  <p className="text-[10px] text-destructive font-bold uppercase mb-2">Type 'DELETE CASE' to confirm</p>
                  <input 
                    type="text"
                    className="w-full bg-background border border-destructive/30 rounded px-3 py-2 text-sm font-bold text-center"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                <Button 
                  variant="destructive" 
                  onClick={handleSoftDelete}
                  disabled={!deleteReason || !deleteNote || confirmText !== 'DELETE CASE'}
                >
                  Confirm Soft Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex items-start gap-4">
        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs text-amber-800 font-medium">
            Operational Restriction: As a Super Admin, you have full visibility of this case but cannot change its operational status, assign investigators, or perform investigation tasks. Your role is limited to governance oversight and archival management.
          </p>
        </div>
      </div>

      <CaseHeader
        id={incident.id}
        title={incident.title}
        companyName={incident.companyName}
        status={incident.status}
        statusColor={getStatusColor(incident.status)}
        severity={incident.severity}
        severityColor={getSeverityColor(incident.severity)}
        submittedDate={incident.dateReported}
        backLabel="All Governance Cases"
        onBack={() => navigate('/super-admin/cases')}
        escalatedTo={incident.escalations?.map(e => e.agency)}
      />

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-muted/30 p-1 border border-border/40 h-11">
          <TabsTrigger value="details" className="px-6 h-full font-bold uppercase tracking-widest text-[10px]">
            <FileText className="h-3 w-3 mr-2" />
            Case Content
          </TabsTrigger>
          <TabsTrigger value="timeline" className="px-6 h-full font-bold uppercase tracking-widest text-[10px]">
            <History className="h-3 w-3 mr-2" />
            Lifecycle Timeline
          </TabsTrigger>
          <TabsTrigger value="governance" className="px-6 h-full font-bold uppercase tracking-widest text-[10px]">
            <Shield className="h-3 w-3 mr-2" />
            Governance Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <CaseDetailsView incident={incident} />
        </TabsContent>

        <TabsContent value="timeline">
          <CaseTimeline events={timelineEvents} />
        </TabsContent>

        <TabsContent value="governance">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest">Administrative Audit Trail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: 'Ahmad Faiz (Super Admin)', action: 'Viewed Case Details', time: '2026-03-08 16:45' },
                  { user: 'System', action: 'Bi-directional Sync triggered', time: '2026-03-08 10:30' },
                ].map((log, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 text-sm">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-primary" />
                      <span className="font-medium">{log.user}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">{log.action}</span>
                      <span className="text-xs text-muted-foreground font-mono">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
