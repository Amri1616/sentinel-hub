import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Eye, AlertTriangle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const pendingEscalations = [
  { id: 'PSIRP-2025-0045', title: 'High-value theft – KL hub', officer: 'Ahmad Razif', severity: 'Critical', lea: 'PDRM – Commercial Crime', submitted: '2025-06-10', days: 2 },
  { id: 'PSIRP-2025-0052', title: 'Dangerous goods interception', officer: 'Nurul Hana', severity: 'High', lea: 'PDRM – Narcotics', submitted: '2025-06-10', days: 1 },
  { id: 'PSIRP-2025-0058', title: 'Suspicious parcel pattern', officer: 'Lee Wei', severity: 'High', lea: 'PDRM – Intelligence', submitted: '2025-06-08', days: 3 },
  { id: 'PSIRP-2025-0060', title: 'Cross-border contraband attempt', officer: 'Farah Amin', severity: 'Critical', lea: 'Royal Malaysian Customs', submitted: '2025-06-10', days: 1 },
  { id: 'PSIRP-2025-0063', title: 'Tampering at sorting centre', officer: 'Raj Kumar', severity: 'Medium', lea: 'PDRM – Commercial Crime', submitted: '2025-06-09', days: 4 },
];

export default function EscalationQueue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [approveDialog, setApproveDialog] = useState<string | null>(null);
  const [rejectDialog, setRejectDialog] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // If viewing a specific escalation, show detail
  if (id) {
    const esc = pendingEscalations.find((e) => e.id === id);
    if (!esc) return <p className="text-muted-foreground">Escalation not found.</p>;
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{esc.id}</h1>
            <p className="text-muted-foreground">{esc.title}</p>
          </div>
          <Badge variant="outline" className="border-destructive/50 text-destructive">{esc.severity}</Badge>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Escalation Details</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                ['Requesting Officer', esc.officer],
                ['Submitted', esc.submitted],
                ['Selected LEA', esc.lea],
                ['Severity', esc.severity],
              ].map(([l, v]) => (
                <div key={l}><p className="text-xs text-muted-foreground">{l}</p><p className="text-sm">{v}</p></div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Justification</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm">
                Strong evidence of criminal activity requiring LEA involvement. Case officer has completed initial assessment and gathered supporting documentation. Severity classification warrants immediate escalation per PSIRP policy framework.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate(`/supervisor/cases/${esc.id}`)}>
            <Eye className="h-4 w-4 mr-2" /> View Full Case
          </Button>
          <Button className="bg-status-closed text-primary-foreground hover:bg-status-closed/90" onClick={() => setApproveDialog(esc.id)}>
            <CheckCircle className="h-4 w-4 mr-2" /> Approve Escalation
          </Button>
          <Button variant="destructive" onClick={() => setRejectDialog(esc.id)}>
            <XCircle className="h-4 w-4 mr-2" /> Reject Escalation
          </Button>
        </div>

        {/* Approve Dialog */}
        <Dialog open={!!approveDialog} onOpenChange={() => setApproveDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Escalation Approval</DialogTitle>
              <DialogDescription>This will escalate {approveDialog} to the selected LEA and notify all parties.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setApproveDialog(null)}>Cancel</Button>
              <Button className="bg-status-closed text-primary-foreground" onClick={() => { toast({ title: 'Escalation Approved', description: `${approveDialog} escalated to LEA.` }); setApproveDialog(null); navigate('/supervisor/escalations'); }}>
                Confirm Approval
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={!!rejectDialog} onOpenChange={() => setRejectDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Escalation</DialogTitle>
              <DialogDescription>Provide a reason for rejecting this escalation request. The case will be returned to the Case Officer.</DialogDescription>
            </DialogHeader>
            <Textarea placeholder="Enter rejection reason (required)..." value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} className="min-h-[100px]" />
            <DialogFooter>
              <Button variant="outline" onClick={() => { setRejectDialog(null); setRejectionReason(''); }}>Cancel</Button>
              <Button variant="destructive" disabled={!rejectionReason.trim()} onClick={() => { toast({ title: 'Escalation Rejected', description: `${rejectDialog} returned to Case Officer.` }); setRejectDialog(null); setRejectionReason(''); navigate('/supervisor/escalations'); }}>
                Confirm Rejection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Officer</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Target LEA</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Age (days)</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingEscalations.map((esc) => (
                <TableRow key={esc.id}>
                  <TableCell className="font-medium">{esc.id}</TableCell>
                  <TableCell>{esc.title}</TableCell>
                  <TableCell>{esc.officer}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={esc.severity === 'Critical' ? 'border-destructive/50 text-destructive' : 'border-status-in-review/50 text-status-in-review'}>
                      {esc.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{esc.lea}</TableCell>
                  <TableCell className="text-muted-foreground">{esc.submitted}</TableCell>
                  <TableCell>{esc.days}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => navigate(`/supervisor/escalations/${esc.id}`)}>Review</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
