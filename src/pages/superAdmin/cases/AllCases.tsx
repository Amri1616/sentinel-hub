import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Trash2, 
  ShieldAlert, 
  History,
  AlertTriangle,
  Download,
  Calendar,
  Building2,
  Lock,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const mockCases = [
  { id: 'PSIR-2026-0082', organisation: 'Pos Malaysia Berhad', title: 'Suspicious Package - KLIA Hub', category: 'Dangerous Goods', severity: 'critical', status: 'investigating', date: '2026-03-08 09:20' },
  { id: 'PSIR-2026-0081', organisation: 'Ninja Van Malaysia', title: 'Unauthorized Hub Entry', category: 'Security Breach', severity: 'high', status: 'review_pending', date: '2026-03-08 08:45' },
  { id: 'PSIR-2026-0080', organisation: 'Global Express', title: 'Theft of High-Value Parcels', category: 'Theft', severity: 'high', status: 'escalated', date: '2026-03-07 16:30' },
  { id: 'PSIR-2026-0079', organisation: 'City-Link Express', title: 'Data Tampering Allegation', category: 'Fraud/Tampering', severity: 'medium', status: 'closed', date: '2026-03-07 14:15' },
  { id: 'PSIR-2026-0078', organisation: 'GDEX Berhad', title: 'Loss of sensitive documents', category: 'Loss', severity: 'medium', status: 'clarification_pending', date: '2026-03-07 11:00' },
];

export default function AllCases() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Deletion state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [deleteNote, setDeleteNote] = useState('');
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-destructive text-destructive-foreground">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-500 text-white border-none shadow-[0_0_8px_rgba(249,115,22,0.5)]">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'investigating':
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Investigating</Badge>;
      case 'review_pending':
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Review Pending</Badge>;
      case 'escalated':
        return <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">Escalated</Badge>;
      case 'closed':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Closed</Badge>;
      case 'clarification_pending':
        return <Badge className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20">RFI Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDeleteInitiate = (caseData: any) => {
    setSelectedCase(caseData);
    setIsDeleteDialogOpen(true);
    setDeleteReason('');
    setDeleteNote('');
    setDeleteConfirmationText('');
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmationText !== 'DELETE CASE') {
      toast({
        title: "Validation Error",
        description: "Please type DELETE CASE exactly to confirm.",
        variant: "destructive"
      });
      return;
    }

    if (!deleteReason || !deleteNote) {
      toast({
        title: "Validation Error",
        description: "Reason and note are mandatory for deletion.",
        variant: "destructive"
      });
      return;
    }

    // Logic for deletion
    toast({
      title: "Case Deleted Successfully",
      description: `Case ${selectedCase.id} has been removed from active records and logged in audit trails.`,
    });
    
    setIsDeleteDialogOpen(false);
  };

  const filteredCases = mockCases.filter(c => 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.organisation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Governance</h1>
          <p className="text-muted-foreground mt-1">Global oversight and administrative control of all platform case reports.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/super-admin/deleted-cases')}>
            <History className="mr-2 h-4 w-4" />
            Audit Deleted Cases
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Archive
          </Button>
        </div>
      </div>

      <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg flex items-start gap-4">
        <ShieldAlert className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold text-destructive">Administrative Governance Visibility</h3>
          <p className="text-xs text-destructive/80 mt-0.5">
            You are currently viewing the system-wide case management interface. All actions performed here, especially deletions, are captured in the high-security audit log.
          </p>
        </div>
      </div>

      <Card className="border-border/40 overflow-hidden shadow-sm">
        <CardHeader className="bg-accent/30 py-4 border-b">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by ID, title, or organisation..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 text-[11px] uppercase tracking-wider font-bold">
                  <TableHead>Case ID</TableHead>
                  <TableHead>Organisation</TableHead>
                  <TableHead>Incident Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-right">Admin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((c) => (
                  <TableRow key={c.id} className="hover:bg-accent/20 transition-colors">
                    <TableCell className="font-mono text-xs font-bold">{c.id}</TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                        {c.organisation}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{c.title}</TableCell>
                    <TableCell className="text-xs">{c.category}</TableCell>
                    <TableCell>{getSeverityBadge(c.severity)}</TableCell>
                    <TableCell>{getStatusBadge(c.status)}</TableCell>
                    <TableCell className="text-[10px] text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {c.date}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>Administrative Access</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => navigate(`/super-admin/cases/${c.id}`)}>
                            <Eye className="mr-2 h-4 w-4 font-bold" />
                            Global Case View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <History className="mr-2 h-4 w-4 text-blue-500" />
                            Case Lifecycle Audit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="mr-2 h-4 w-4 text-indigo-500" />
                            View Clarification Threads
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive font-semibold" onClick={() => handleDeleteInitiate(c)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Case Record
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Strict Deletion Modal */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px] border-destructive/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Strict Safeguard: Case Deletion
            </DialogTitle>
            <DialogDescription className="pt-2">
              You are about to permanently remove Case <span className="font-bold text-foreground font-mono">{selectedCase?.id}</span> from the active management system. This action is irreversible and will be logged in the system audit trail.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                Reason for Removal <span className="text-destructive">*</span>
              </Label>
              <Select onValueChange={setDeleteReason} value={deleteReason}>
                <SelectTrigger id="reason" className="border-destructive/30 focus:ring-destructive">
                  <SelectValue placeholder="Select an official reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="duplicate">Duplicate Case Record</SelectItem>
                  <SelectItem value="testing">Testing / Demo Data Cleanup</SelectItem>
                  <SelectItem value="legal">Legal / Private Privacy Requirement</SelectItem>
                  <SelectItem value="erroneous">Erroneous Filing (Irreparable)</SelectItem>
                  <SelectItem value="other">Other System Governance Reason</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="note" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                Justification Note <span className="text-destructive">*</span>
              </Label>
              <Textarea 
                id="note" 
                placeholder="Describe why this case is being removed. This note will appear in the audit trail." 
                className="min-h-[100px] border-destructive/30 focus:ring-destructive resize-none"
                value={deleteNote}
                onChange={(e) => setDeleteNote(e.target.value)}
              />
            </div>

            <div className="bg-destructive/5 border border-destructive/20 p-3 rounded-md space-y-3">
              <Label className="text-xs font-bold text-destructive uppercase tracking-wider block">
                Security Confirmation
              </Label>
              <p className="text-[11px] text-destructive/80 leading-relaxed italic">
                To prevent accidental deletion, please type <span className="font-bold underline">DELETE CASE</span> below to enable the removal button.
              </p>
              <Input 
                className="bg-background border-destructive/40 text-center font-bold tracking-widest placeholder:font-normal placeholder:tracking-normal"
                placeholder="Type confirmation phrase here"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="sm:justify-between gap-3">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={false} className="sm:flex-1">
              Cancel & Guard
            </Button>
            <Button 
              variant="destructive" 
              className="sm:flex-1 font-bold shadow-lg shadow-destructive/20"
              disabled={deleteConfirmationText !== 'DELETE CASE' || !deleteReason || !deleteNote}
              onClick={handleConfirmDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Finalize Removal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
