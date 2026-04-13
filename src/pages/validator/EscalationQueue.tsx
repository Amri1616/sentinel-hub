import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { CheckCircle, XCircle, Eye, AlertTriangle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const pendingEscalations = [
  { id: 'PSIRP-2025-0045', title: 'High-value theft – KL hub', officer: 'Ahmad Razif', severity: 'Critical', lea: ['PDRM'], submitted: '2025-06-10', days: 2 },
  { id: 'PSIRP-2025-0052', title: 'Dangerous goods interception', officer: 'Nurul Hana', severity: 'High', lea: ['PDRM', 'NACSA'], submitted: '2025-06-10', days: 1 },
  { id: 'PSIRP-2025-0058', title: 'Suspicious parcel pattern', officer: 'Lee Wei', severity: 'High', lea: ['PDRM'], submitted: '2025-06-08', days: 3 },
  { id: 'PSIRP-2025-0060', title: 'Cross-border contraband attempt', officer: 'Farah Amin', severity: 'Critical', lea: ['CUSTOMS', 'MCMC', 'CSM'], submitted: '2025-06-10', days: 1 },
  { id: 'PSIRP-2025-0063', title: 'Tampering at sorting centre', officer: 'Raj Kumar', severity: 'Medium', lea: ['PDRM'], submitted: '2025-06-09', days: 4 },
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
                ['Selected LEA', esc.lea.join(', ')],
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
