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
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Trash2, 
  History, 
  Eye, 
  RotateCcw, 
  Download,
  Calendar,
  User,
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

const mockDeletedCases = [
  { id: 'PSIR-2026-0042', organisation: 'Pos Malaysia', title: 'Test Submission - Hub KL', deletedBy: 'Super Admin', deletedDate: '2026-03-05 14:20', reason: 'Duplicate Case Record', notes: 'This case was accidentally submitted twice by the reporter.' },
  { id: 'PSIR-2025-0812', organisation: 'Ninja Van', title: 'Internal Hub Testing', deletedBy: 'System Admin', deletedDate: '2026-02-15 09:30', reason: 'Testing / Demo Data Cleanup', notes: 'Removing old test data from previous staging cycle.' },
  { id: 'PSIR-2026-0012', organisation: 'Global Express', title: 'Sensitive Item Leak', deletedBy: 'Super Admin', deletedDate: '2026-03-01 11:45', reason: 'Legal / Private Privacy Requirement', notes: 'Case removed due to court order for privacy protection.' },
];

export default function DeletedCases() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCase, setSelectedCase] = useState<any>(null);

  const filteredCases = mockDeletedCases.filter(c => 
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/super-admin/cases')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Deleted Records Archive</h1>
            <p className="text-muted-foreground mt-1">Audit log and governance tracking for all removed case reports.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Audit Export
          </Button>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg flex items-start gap-4 shadow-sm">
        <ShieldAlert className="h-5 w-5 text-amber-600 mt-1 shrink-0" />
        <div className="text-sm">
          <h3 className="font-bold text-amber-800 uppercase tracking-wider text-xs">Record Governance Visibility</h3>
          <p className="text-amber-700 mt-0.5 leading-relaxed">
            This archive contains case reports that were removed from the active system. While these are hidden from operational roles, they are permanently preserved here for audit and legal compliance.
          </p>
        </div>
      </div>

      <Card className="border-border/40 overflow-hidden shadow-sm">
        <CardHeader className="bg-accent/30 py-4 border-b">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by ID or title..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 text-[11px] uppercase tracking-wider font-bold">
                  <TableHead>Incident ID</TableHead>
                  <TableHead>Original Title</TableHead>
                  <TableHead>Deleted By</TableHead>
                  <TableHead>Deletion Date</TableHead>
                  <TableHead>Reason for Removal</TableHead>
                  <TableHead className="text-right">Admin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.map((c) => (
                  <TableRow key={c.id} className="hover:bg-accent/20 transition-colors">
                    <TableCell className="font-mono text-xs font-bold text-muted-foreground">{c.id}</TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate">{c.title}</TableCell>
                    <TableCell className="text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 text-muted-foreground" />
                        {c.deletedBy}
                      </div>
                    </TableCell>
                    <TableCell className="text-[10px] text-muted-foreground whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {c.deletedDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-destructive/30 text-destructive bg-destructive/5 text-[10px] py-0 px-2 uppercase tracking-tighter">
                        {c.reason}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedCase(c)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedCase} onOpenChange={(open) => !open && setSelectedCase(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Deletion Audit Detail
            </DialogTitle>
            <DialogDescription>
              Complete history of the removal of Incident <span className="font-bold text-foreground">{selectedCase?.id}</span>.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Incident ID</p>
                <p className="text-sm font-mono font-bold">{selectedCase?.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Original Organisation</p>
                <p className="text-sm font-medium">{selectedCase?.organisation}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Removed By</p>
                <p className="text-sm font-medium">{selectedCase?.deletedBy}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Removal Timestamp</p>
                <p className="text-sm font-medium">{selectedCase?.deletedDate}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Official Reason</p>
              <Badge variant="secondary" className="bg-destructive/10 text-destructive border-none py-1 px-3">
                {selectedCase?.reason}
              </Badge>
            </div>

            <div className="space-y-2 bg-accent/30 p-4 rounded-lg border border-border/40">
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Administrator's Justification Note</p>
              <p className="text-sm leading-relaxed italic text-foreground/80">
                "{selectedCase?.notes}"
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedCase(null)} className="w-full">
              Close Audit Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
