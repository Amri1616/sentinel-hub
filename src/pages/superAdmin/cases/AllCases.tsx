import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
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
  MessageSquare,
  X,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const mockCases = [
  {
    id: 'PSIR-2026-0082', organisation: 'Pos Malaysia Berhad', title: 'Suspicious Package - KLIA Hub', category: 'Dangerous Goods', severity: 'Critical', status: 'Under Review', submitted: '2026-03-08', lastUpdated: '2026-03-08 09:20', officer: 'Nurul Hana', isOwn: false,
    escalations: [
      { name: 'PDRM', status: 'Under Investigation' },
      { name:  'KKM ( Pharmacy )', status: 'Under Investigation' }
    ]
  },
  { id: 'PSIR-2026-0081', organisation: 'Ninja Van Malaysia', title: 'Unauthorized Hub Entry', category: 'Security Breach', severity: 'High', status: 'Pending Review', submitted: '2026-03-08', lastUpdated: '2026-03-08 08:45', officer: 'You', isOwn: true, escalations: [] },
  { 
    id: 'PSIR-2026-0080', organisation: 'Global Express', title: 'Theft of High-Value Parcels', category: 'Theft', severity: 'High', status: 'Escalation Pending', submitted: '2026-03-07', lastUpdated: '2026-03-07 16:30', officer: 'Lee Wei', isOwn: false, 
    escalations: [
      { name: 'MOT', status: 'Evidence Seized' }
    ]
  },
  { id: 'PSIR-2026-0079', organisation: 'City-Link Express', title: 'Data Tampering Allegation', category: 'Fraud/Tampering', severity: 'Medium', status: 'Closed', submitted: '2026-03-07', lastUpdated: '2026-03-07 14:15', officer: 'Ahmad Razif', isOwn: false, escalations: [] },
  { id: 'PSIR-2026-0078', organisation: 'GDEX Berhad', title: 'Loss of sensitive documents', category: 'Loss', severity: 'Medium', status: 'RFI Sent', submitted: '2026-03-07', lastUpdated: '2026-03-07 11:00', officer: 'Farah Amin', isOwn: false, escalations: [] },
];

export default function AllCases() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [deleteNote, setDeleteNote] = useState('');
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  const caseCategories = [
    { id: 'all', label: 'All Cases' },
    { id: 'prohibited-postal', label: 'Prohibited Postal Items' },
    { id: 'serious-threat', label: 'Serious Threat' },
    { id: 'cyber-security', label: 'Cyber Security Incidents' },
    { id: 'medium-severity', label: 'Medium Severity Incident' },
    { id: 'operational-issues', label: 'Operational Issues' },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Pending Review': 'bg-status-in-review/20 text-status-in-review border-status-in-review/30 px-2.5 py-0.5 rounded-full',
      'RFI Sent': 'bg-status-rfi/20 text-status-rfi border-status-rfi/30 px-2.5 py-0.5 rounded-full',
      'Under Review': 'bg-status-submitted/20 text-status-submitted border-status-submitted/30 px-2.5 py-0.5 rounded-full',
      'Escalation Pending': 'bg-destructive/20 text-destructive border-destructive/30 px-2.5 py-0.5 rounded-full',
      'Closed': 'bg-status-closed/20 text-status-closed border-status-closed/30 px-2.5 py-0.5 rounded-full',
    };
    return colors[status] || 'bg-secondary px-2.5 py-0.5 rounded-full';
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      'Critical': 'bg-red-500/20 text-red-500 border-red-500/30 px-2.5 py-0.5 rounded-full',
      'High': 'bg-orange-500/20 text-orange-600 border-orange-500/30 px-2.5 py-0.5 rounded-full',
      'Medium': 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30 px-2.5 py-0.5 rounded-full',
      'Low': 'bg-green-500/20 text-green-600 border-green-500/30 px-2.5 py-0.5 rounded-full',
    };
    return colors[severity] || 'bg-secondary px-2.5 py-0.5 rounded-full';
  };

  const renderEscalatedTo = (escalations: any[], caseId: string) => {
    if (escalations.length === 0) return <span className="text-muted-foreground text-[11px] italic">Not Escalated</span>;
    const detailUrl = `/super-admin/cases/${caseId}#escalation-status`;
    const display = escalations.slice(0, 2);
    const remaining = escalations.length - 2;
    const content = (
      <div className={`flex flex-wrap justify-center gap-1 ${escalations.length > 2 ? 'cursor-help' : ''}`}>
        {display.map((e, idx) => (
          <Badge 
            key={idx} 
            variant="secondary" 
            className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 px-1.5 py-0 h-5 text-[10px] font-bold cursor-pointer hover:ring-1 hover:ring-primary/30 transition-all"
            onClick={(ev) => {
              ev.stopPropagation();
              navigate(detailUrl);
            }}
          >
            {e.name}
          </Badge>
        ))}
        {remaining > 0 && (
          <Badge 
            variant="secondary" 
            className="bg-primary/5 text-primary border-primary/20 px-1.5 py-0 h-5 text-[10px] font-bold cursor-pointer hover:bg-primary/10 transition-all"
            onClick={(ev) => {
              ev.stopPropagation();
              navigate(detailUrl);
            }}
          >
            +{remaining} more
          </Badge>
        )}
      </div>
    );

    if (escalations.length <= 2) return content;

    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent className="p-3 bg-popover border-border shadow-xl min-w-[150px]">
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Escalated Agencies</p>
              <div className="flex flex-wrap gap-1.5">
                {escalations.map((e, idx) => (
                  <Badge key={idx} variant="outline" className="text-[10px] px-2 py-0.5 bg-slate-50 text-slate-700 border-slate-200 font-bold uppercase">
                    {e.name}
                  </Badge>
                ))}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderAgencyProgress = (escalations: any[]) => {
    if (escalations.length === 0) return <span className="text-muted-foreground text-xs">-</span>;
    const statuses = escalations.map(e => e.status);
    const uniqueStatuses = Array.from(new Set(statuses));
    const isAllSame = uniqueStatuses.length === 1;
    const completedCount = escalations.filter(e => e.status.toLowerCase().includes('closed') || e.status.toLowerCase().includes('completed')).length;
    let badgeText = '';
    let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
    if (isAllSame) {
      badgeText = `All ${uniqueStatuses[0]}`;
      if (uniqueStatuses[0].toLowerCase().includes('investigation')) badgeStyle = 'bg-blue-50 text-blue-700 border-blue-200';
      if (uniqueStatuses[0].toLowerCase().includes('closed')) badgeStyle = 'bg-green-50 text-green-700 border-green-200';
    } else {
      if (completedCount > 0) {
        badgeText = `${completedCount}/${escalations.length} Completed`;
        badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
      } else {
        badgeText = 'Pending Updates';
        badgeStyle = 'bg-slate-100 text-slate-600 border-slate-200 italic';
      }
    }
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <div className="flex justify-center cursor-help">
              <Badge variant="outline" className={`${badgeStyle} text-[10px] px-2 py-0.5 font-medium whitespace-nowrap`}>
                {badgeText}
              </Badge>
            </div>
          </TooltipTrigger>
          <TooltipContent className="p-3 bg-popover border-border shadow-xl min-w-[200px]">
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Agency Status Breakdown</p>
              {escalations.map((e, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 py-1 border-b border-border/50 last:border-0">
                  <span className="font-bold text-xs">{e.name}</span>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${e.status.toLowerCase().includes('closed') ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                    {e.status}
                  </Badge>
                </div>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  const handleDeleteInitiate = (caseData: any) => {
    setSelectedCase(caseData);
    setIsDeleteDialogOpen(true);
    setDeleteReason('');
    setDeleteNote('');
    setDeleteConfirmationText('');
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmationText !== 'DELETE CASE') {
      toast({ title: 'Validation Error', description: 'Please type DELETE CASE exactly to confirm.', variant: 'destructive' });
      return;
    }
    if (!deleteReason || !deleteNote) {
      toast({ title: 'Validation Error', description: 'Reason and note are mandatory for deletion.', variant: 'destructive' });
      return;
    }

    toast({ title: 'Case Deleted Successfully', description: `Case ${selectedCase.id} has been removed from active records and logged in audit trails.` });
    setIsDeleteDialogOpen(false);
  };

  const filteredAndSortedCases = mockCases
    .filter(c => {
      const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.organisation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

  const renderTable = () => (
    <div className="relative group w-full overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-3 py-4 text-center align-middle text-[11px] font-bold uppercase tracking-wider text-foreground min-w-[140px]">Reference</th>
              <th className="px-3 py-4 text-center align-middle text-[11px] font-bold uppercase tracking-wider text-foreground min-w-[180px]">Organisation</th>
              <th className="px-3 py-4 text-center align-middle text-[11px] font-bold uppercase tracking-wider text-foreground min-w-[150px]">Assigned Officer</th>
              <th className="px-3 py-4 text-center align-middle text-[11px] font-bold uppercase tracking-wider text-foreground min-w-[120px]">Severity</th>
              <th className="px-3 py-4 text-center align-middle text-[11px] font-bold uppercase tracking-wider text-foreground min-w-[140px]">Internal Status</th>
              <th className="px-3 py-4 text-center align-middle text-[11px] font-bold uppercase tracking-wider text-foreground min-w-[150px]">Escalated To</th>
              <th className="px-3 py-4 text-center align-middle text-[11px] font-bold uppercase tracking-wider text-foreground min-w-[160px]">Agency Progress</th>
              <th className="px-3 py-4 text-center align-middle text-[11px] font-bold uppercase tracking-wider text-foreground min-w-[160px]">Last Updated</th>
              <th className="px-3 py-4 text-center align-middle text-[11px] font-bold uppercase tracking-wider text-foreground min-w-[140px]">Submitted</th>
              <th className="px-3 py-4 text-center align-middle text-[11px] font-bold uppercase tracking-wider text-foreground min-w-[50px]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAndSortedCases.map((c) => (
              <tr key={c.id} className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-3 py-4 text-center align-middle">
                  <span className="font-mono font-bold text-primary hover:underline cursor-pointer text-xs" onClick={() => navigate(`/super-admin/cases/${c.id}`)}>
                    {c.id}
                  </span>
                </td>
                <td className="px-3 py-4 text-center align-middle text-xs text-muted-foreground whitespace-normal">
                  <div className="flex items-center justify-center gap-2">
                    <Building2 className="h-3 w-3" />
                    {c.organisation}
                  </div>
                </td>
                <td className="px-3 py-4 text-center align-middle text-xs">
                  <span className={c.isOwn ? 'text-blue-600 font-medium' : 'text-muted-foreground'}>{c.officer}</span>
                </td>
                <td className="px-3 py-4 text-center align-middle">
                  <div className="flex justify-center">
                    <Badge variant="outline" className={`${getSeverityColor(c.severity)} text-[10px]`}>{c.severity}</Badge>
                  </div>
                </td>
                <td className="px-3 py-4 text-center align-middle">
                  <div className="flex justify-center">
                    <Badge variant="outline" className={`${getStatusColor(c.status)} text-[10px]`}>{c.status}</Badge>
                  </div>
                </td>
                <td className="px-3 py-4 text-center align-middle">
                  {renderEscalatedTo(c.escalations, c.id)}
                </td>
                <td className="px-3 py-4 text-center align-middle">
                  {renderAgencyProgress(c.escalations)}
                </td>
                <td className="px-3 py-4 text-center align-middle text-[10px] text-muted-foreground whitespace-nowrap">{c.lastUpdated}</td>
                <td className="px-3 py-4 text-center align-middle text-[10px] text-muted-foreground">{c.submitted}</td>
                <td className="px-3 py-4 text-center align-middle">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Administrative Access</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate(`/super-admin/cases/${c.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Global Case View
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive font-semibold" onClick={() => handleDeleteInitiate(c)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Case Record
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none bg-gradient-to-l from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-r" />
    </div>
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

      <Tabs value={categoryFilter} onValueChange={setCategoryFilter} className="w-full space-y-4">
        <TabsList className="bg-muted/50 p-1 border h-11">
          {caseCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="px-6 h-full font-bold uppercase tracking-widest text-[10px]">{category.label}</TabsTrigger>
          ))}
        </TabsList>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by ID, title, or organisation..." 
              className="pl-10 h-11 text-sm bg-card w-full md:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-11 border-dashed">
              <Filter className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px] h-11">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-11 border-dashed">
              More Filters
            </Button>
          </div>
        </div>

        <TabsContent value={categoryFilter} className="mt-0">
          <Card className="border-border/40 overflow-hidden shadow-sm">
            <CardContent className="p-0">
              {renderTable()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/40">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <p>Showing <span className="font-bold text-foreground">{filteredAndSortedCases.length}</span> results</p>
          <div className="h-4 w-px bg-border" />
          <p>Filtered by: <span className="font-bold text-primary uppercase tracking-widest text-[10px]">{categoryFilter}</span></p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" disabled>Previous</Button>
          <Button variant="ghost" size="sm" disabled>Next</Button>
        </div>
      </div>

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

